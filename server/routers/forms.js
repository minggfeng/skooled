var express = require('express');
var router = express.Router();
var pg = require('../../psql-database');
var bodyParser = require('body-parser');
var services = require('../../services');
var Promise = require('bluebird');

var ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

var insertQuestionAsync = Promise.promisify(pg.insertQuestion);

router.post('/save', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id
  let questions = req.body.questions;
  let homework_name = req.body.name;
  Promise.map( questions, (question) => {
    console.log('!!!!questions', questions);
    console.log('conte', JSON.stringify(question))
    let questionObj = {
      type: question.type,
      content: JSON.stringify(question),
      created_by: user_id
    }
    return questionObj;
  })
  .then((questionObjs) => {
    Promise.map(questionObjs, (questionObj) => {
      return insertQuestionAsync(questionObj)
      .then((questionRow) => {
        return questionRow.attributes.id;
      })
    })
    .then((questionIds) => {
      let options = {
        title: homework_name,
        teacher_id: user_id,
        questions: JSON.stringify(questionIds)
      }
      pg.insertHomework(options, (err, homework) => {
        if (homework) {
          res.send(homework);
        }
      })
    })
  })
})

router.get('/myHomework', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id;
  let options = {
    teacher_id: user_id
  }
  pg.fetchHomework(options, (err, homework) => {
    if (homework) {
      res.send(homework);
    }
  })
})

const fetchQuestionsAsync = Promise.promisify(pg.fetchQuestions);

router.post('/questions', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id;
  console.log(JSON.parse(req.body.questions))
  let questions = JSON.parse(req.body.questions).map((questionId) => {
    return { id: questionId }
  });

  Promise.map(questions, (question) => {
    return fetchQuestionsAsync(question)
    .then((data) => {
      return data.models[0].attributes;
    })
  })
  .then((questions) => {
    res.send(questions);
  })
})

const insertAssignedFormsAsync = Promise.promisify(pg.insertAssignedForms);

router.post('/assignForms', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id;
  let classes = req.body.classes;
  let homework = req.body.homework.id
  console.log(homework);
  Promise.map(classes, (classId) => {
    let options = {
      homework_id: homework,
      classes_id: classId
    }
    return insertAssignedFormsAsync(options)
    .then((data) => {
      return data.models[0].attributes;
    })
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    res.send(err);
  })
})

const selectClassesByIdAsync = Promise.promisify(pg.selectClassesById)

router.get('/studentClasses', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id;
  pg.selectUserById(user_id, (err, user) => {
    if (user) {
      let email = user.attributes.email
      let options = {
        email: email
      }
      pg.selectStudentOptions(options, (err, student) => {
        if (student) {
          let student_id = student.attributes.id;
          let options = {
            student_id: student_id
          }
          pg.fetchStudentsInClass(options, (err, relations) => {
            Promise.map(relations.models, (model) => {
              let class_id = model.attributes.class_id;
              let options = {
                id: class_id
              }
              return selectClassesByIdAsync(options)
              .then((classObj) => {
                return classObj.models[0].attributes;
              })

            })
            .then((classes) => {
              res.send(classes);
            })
          })
        }
      })
    }
  })
})

router.post('/studentAssignments', ensureAuthorized, (req, res) => {
  let classObj = req.body;
  console.log(req.body)
  pg.fetchClassesHomework(classObj, (err, relations) => {
    Promise.map(relations.models, (model) => {
      
    })
  })
})


module.exports = router;
