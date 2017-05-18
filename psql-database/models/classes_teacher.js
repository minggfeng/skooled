const bookshelf = require('../bookshelf.js');

const ClassesTeacher = bookshelf.Model.extend({
  tableName: 'classes_teacher'
})

module.exports = bookshelf.model('ClassesTeacher', ClassesTeacher);