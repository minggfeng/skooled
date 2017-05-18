const bookshelf = require('../bookshelf.js');

const Classes = bookshelf.Model.extend({
  tableName: 'classes'
})

module.exports = bookshelf.model('Classes', Classes);