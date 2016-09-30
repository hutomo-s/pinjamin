/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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
};

