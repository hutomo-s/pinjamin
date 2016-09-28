var Waterline = require('waterline');

var User = Waterline.Collection.extend({

  attributes: {

    connection:'mysql',
    tableName:'user',

    id: {
      type: 'int',
      required: true,
      primaryKey: true,
      unique: true
    },

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
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