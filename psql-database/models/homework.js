var bookshelf = require('../bookshelf.js');

var Homework = bookshelf.Model.extend({
  tableName: 'homework'
});

module.exports = bookshelf.model('Homework', Homework);