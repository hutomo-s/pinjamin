var Waterline = require('waterline');

var User = Waterline.Collection.extend({

  attributes: {

    connection:'mysql',
    tableName:'loanrequest',

    id: {
      type: 'int',
      required: true,
      primaryKey: true,
      unique: true
    },

    date: {
      type: 'date',
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    debit: {
      type: 'int',
      required: true
    },

    credit: {
      type: 'int',
      required: true
    },

    balance: {
      type: 'int',
      required: true
    },

    user_id: {
      type: 'int',
      required: true
    },


    whitelist: {
      type: 'int',
      required: true
    }
  }
});