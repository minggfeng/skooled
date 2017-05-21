var express = require('express');
var router = express.Router();
var pg = require('../../psql-database');
var bodyParser = require('body-parser');
var services = require('../../services');
var Promise = require('bluebird');

var ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

const selectStudentAsync = Promise.promisify(pg.selectStudent)

router.post('/students', ensureAuthorized, (req, res) => {
  let classId = req.body.classId
  console.log('!!')
  let options = {
    class_id: classId
  }
  pg.fetchStudentsInClass(options, (err, data) => {
    if (data) {
      Promise.map(data.models, (model) => {
        let student_id = model.attributes.student_id;
        return selectStudentAsync(student_id)
        .then((student) => {
          return student.attributes;
        })
      })
      .then((students) => {
        res.send(students);
      })
      .catch((err) => {
        res.send(err);
      })
    }
  })
})

const fetchHomeworkAsync = Promise.promisify(pg.fetchHomework);

router.post('/assignments', ensureAuthorized, (req, res) => {
  let classId = req.body.classId
  let user_id = req.decoded.id;
  let options = {
    classes_id: classId
  }
  pg.fetchAssignedForms(options, (err, data) => {
    if (data) {
      Promise.map(data.models, (model) => {
        let homework_id = model.attributes.homework_id;
        return fetchHomeworkAsync({ id: homework_id })
        .then((homework) => {
          return homework.models[0].attributes;
        })
      })
      .then((homeworks) => {
        res.send(homeworks);
      })
      .catch((err) => {
        res.send(err);
      })
    }
  })
})

module.exports = router;