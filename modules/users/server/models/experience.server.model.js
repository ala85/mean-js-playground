'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * User Schema
 */
var ExperienceSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  companyId: {
    type: String,
    default: ''
  }
},
 { versionKey: 'version' });


mongoose.model('Experience', ExperienceSchema);
