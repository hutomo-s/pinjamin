var Waterline = require('waterline');

var User = Waterline.Collection.extend({

  attributes: {

    connection:'mysql',
    tableName:'creditscore',

    id: {
      type: 'int',
      required: true,
      primaryKey: true,
      unique: true
    },

    user_id: {
      type: 'int',
      required: true
    },

    score: {
      type: 'int',
      required: true
    }
  }
});