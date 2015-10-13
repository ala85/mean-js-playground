'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator');


/**
 * User Schema
 */
var CompanySchema = new Schema({
  name: {
    type: String,
    default: ''
  },

  salesForceId: {
    type: String,
    default: ''
  },

  internal: {
    type: Boolean
  }
},
 { versionKey: 'version' });


mongoose.model('Company', CompanySchema);
