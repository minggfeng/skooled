var bookshelf = require('../bookshelf.js');

var Question = bookshelf.Model.extend({
  tableName: 'questions'
});

module.exports = bookshelf.model('Question', Question);