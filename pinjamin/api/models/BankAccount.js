/**
 * Bankaccount.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    user_id: {
      type: 'integer',
      required: true
    },  

    debit: {
      type: 'integer'
    },

    credit: {
      type: 'integer'
    },

    balance: {
      type: 'integer',
      required: true
    },

    whitelist: {
      type: 'integer',
      required: true
    },
    
    description: {
      type: 'string'
    }
  }
};

