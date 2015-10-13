'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Company = mongoose.model('Company'),
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
  var company = req.model;

  //For security purposes only merge these parameters
  company.name = req.body.name;

  company.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(company);
  });
};

/**
 * Delete a company
 */
exports.delete = function (req, res) {
  var company = req.model;

  company.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(company);
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



exports.companyByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Company is invalid'
        });
    }

    Company.findById(id).exec(function (err, company) {
        if (err) {
            return next(err);
        } else if (!company) {
            return next(new Error('Failed to load company ' + id));
        }

        req.model = company;
        next();
    });
};
