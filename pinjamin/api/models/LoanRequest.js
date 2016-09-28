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

    lender_id: {
      type: 'int',
      required: true
    },

    lendee_id: {
      type: 'int',
      required: true
    },

    amount: {
      type: 'int',
      required: true
    },

    period_month: {
      type: 'date',
      required: true
    },

    credit_score: {
      type: 'int',
      required: true
    },

    purpose: {
      type: 'string',
      required: true
    }
  }
});