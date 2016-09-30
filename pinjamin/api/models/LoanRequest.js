/**
 * Loanrequest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    lender_id: {
      type: 'integer'
    },

    lendee_id: {
      type: 'integer',
      required: true
    },

    amount: {
      type: 'integer',
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
      type: 'string'
    }
  }
};

