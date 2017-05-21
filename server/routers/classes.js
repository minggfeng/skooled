var express = require('express');
var router = express.Router();
var pg = require('../../psql-database');
var bodyParser = require('body-parser');
var services = require('../../services');
var Promise = require('bluebird');

var ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

router.post('/students', ensureAuthorized, (req, res) => {
  let classId = req.body.classId
  console.log('!!')
  let user_id = req.decoded.id;
  let options = {
    class_id: classId
  }
  pg.fetchStudentsInClass(options, (err, data) => {
    if (data) {
      console.log(data)
    }
  })
})

router.post('/assignments', ensureAuthorized, (req, res) => {
  let classId = req.body.classId
  let user_id = req.decoded.id;
  let options = {
    classes_id: classId
  }
  pg.fetchAssignedForms(options, (err, data) => {
    if (data) {
      console.log(data)
    }
  })
})

module.exports = router;