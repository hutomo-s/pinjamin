var Waterline = require('waterline');

var User = Waterline.Collection.extend({

  identity: 'user',  
  connection:'mysql',
  tableName:'user',

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true
    },

    mobile: {
      type: 'string',
      required: true
    },

    address: {
      type: 'string',
      required: true
    },

    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    }
  }
});

module.exports = User;