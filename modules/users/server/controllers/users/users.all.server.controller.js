'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Company = mongoose.model('Company'),
  Experience = mongoose.model('Experience'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  //For security purposes only merge these parameters
  user.name = req.body.name;
  user.roles = req.body.roles;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.listUsers = function (req, res) {
  /*User.find().exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });*/
    // page, skip, callback
    var start = (req.query.page * req.query.limit) + (req.query.skip * 1),
        limit = req.query.limit;
    console.log(req.query);
    // Query the db, using skip and limit to achieve page chunks
    User.find({}).skip(start).limit(limit).exec(function(err,users){

        // If everything is cool...
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        // Pass them back to the specified callback
        res.json(users);
    });


};

/**
 * List of Companies
 */
exports.listCompanies = function (req, res) {
    Company.find().exec(function (err, companies) {

        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(companies);
    });
};

/**
 * List of Companies
 */
exports.listExperiences = function (req, res) {
    Experience.find().exec(function (err, companies) {

        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(companies);
    });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

    User.findById(id).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};

