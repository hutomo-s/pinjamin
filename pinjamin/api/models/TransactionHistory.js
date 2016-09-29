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

    purpose: {
      type: 'string',
      required: true
    },

    interest_rate: {
      type: 'int',
      required: true
    },

    status: {
      type: 'int',
      required: true
    },

    due_date: {
      type: 'date',
      required: true
    },
    
    va_number: {
      type: 'string',
      required: true
    }
  }
});