const bookshelf = require('../bookshelf.js');

const ClassesStudent = bookshelf.Model.extend({
  tableName: 'classes_student'
})

module.exports = bookshelf.model('ClassesStudent', ClassesStudent);