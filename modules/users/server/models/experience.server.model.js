'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Company = mongoose.model('Company');


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
  },
  state: {
    type: String,
    default: 'Not Pushed'
  }
},
 {
     versionKey: 'version'
 });

ExperienceSchema.statics.companyName = function (companyId, suffix, callback) {
    var _this = this;
    Company.findOne({
        _id: companyId
    }, function (err, company) {
        if (!err) {
            throw new Error('An unexpected problem occured while retieeving company');
        } else {
            callback(null);
        }
    });
};

mongoose.model('Experience', ExperienceSchema);
