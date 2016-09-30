/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {      
      name	: { 
        type: 'string',
        required: true 
      },
      email	: {
        type: 'string',
        unique: true
      },
      password	: {
        type: 'string',
        required: true
      },
      mobile_no	: { 
        type: 'string',
        unique: true,
        required: true
      },
      address	: {
        type: 'string'
      },
      status	: {
        type: 'string',
        enum: ['loan_active', 'loan_inactive']
      }
  }
};