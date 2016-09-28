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

    user_id_one: {
      type: 'int',
      required: true
    },

    user_id_two: {
      type: 'int',
      required: true
    }
  }
});