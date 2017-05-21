const bookshelf = require('../bookshelf.js');

const ClassesHomework = bookshelf.Model.extend({
  tableName: 'classes_homework'
})

module.exports = bookshelf.model('ClassesHomework', ClassesHomework);