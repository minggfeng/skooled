const bookshelf = require('../bookshelf.js');

const StudentHomework = bookshelf.Model.extend({
  tableName: 'student_homework'
})

module.exports = bookshelf.model('StudentHomework', StudentHomework);