/**
 * Connection.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id_one: {
      type: 'integer',
      required: true
    },

    user_id_two: {
      type: 'integer',
      required: true
    }
  }
};

