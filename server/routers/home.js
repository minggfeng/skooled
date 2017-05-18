var express = require('express');
var router = express.Router();
var pg = require('../../psql-database');
var bodyParser = require('body-parser');
var services = require('../../services');
var Promise = require('bluebird');

var ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

var selectClassesByIdAsync = Promise.promisify(pg.selectClassesById)

router.get('/classes', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id
  let options = {
    teacher_id: user_id
  }
  pg.selectAllClassesTeacher(options, (err, classesTeacher) => {
    if (classesTeacher) {
      Promise.map(classesTeacher.models, (model) => {
        return model.attributes.class_id;
      })
      .then((classesIds) => {
        Promise.map(classesIds, (classId) => {
          return selectClassesByIdAsync({id: classId})
          .then((classData) => {
            return classData.models[0].attributes;
          })
        })
        .then((classes) => {
          res.send(classes);
        })
      })

    }
  })
});

var selectStudentAsync = Promise.promisify(pg.selectStudent);

router.get('/myStudents', ensureAuthorized, (req, res) => {
  let user_id = req.decoded.id;
  pg.retrieveSelectedUsersStudents(user_id, (err, myStudents) => {
    if (myStudents) {
      Promise.map(myStudents.models, (model) => {
        return model.attributes
      })
      .then((studentsRelations) => {
        Promise.map(studentsRelations, (studentRelation) => {
          let studentId = studentRelation.id_student;
          return selectStudentAsync(studentId)
          .then((student) => {
            return student.attributes;
          })
        })
        .then((students) => {
          res.send(students);
        })
      })
      .catch((err) => {
        res.send(err);
      })
    }
  })
});


router.post('/currentStudent', ensureAuthorized, (req, res) => {
  let studentId = req.body.studentId;
  pg.selectStudent(studentId, (err, student) => {
    console.log('studnet', student)
    res.send(student.attributes)
  })
})

module.exports = router;
