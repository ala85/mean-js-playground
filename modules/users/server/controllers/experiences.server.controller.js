'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Experience = mongoose.model('Experience'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current company
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a company
 */
exports.update = function (req, res) {
  var experience = req.model;

  //For security purposes only merge these parameters
  experience.name = req.body.name;

  experience.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(experience);
  });
};

/**
 * Delete a company
 */
exports.delete = function (req, res) {
  var experience = req.model;

  experience.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(experience);
  });
};


/**
 * List of Experiences
 */
exports.listExperiences = function (req, res) {
    Experience.find().exec(function (err, experiences) {

        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(experiences);
    });
};



exports.experienceByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Company is invalid'
        });
    }

    Experience.findById(id).exec(function (err, experience) {
        if (err) {
            return next(err);
        } else if (!experience) {
            return next(new Error('Failed to load company ' + id));
        }

        req.model = experience;
        next();
    });
};
