'use strict';

module.exports = function (app) {
  // User Routes
  var adminPolicy = require('../policies/admin.server.policy.js'),
      company = require('../controllers/companies.server.controller.js');

    // Users collection routes
    app.route('/api/companies')
        .get(adminPolicy.isAllowed, company.listCompanies);

    // Single user routes
    app.route('/api/companies/:companyId')
        .get(adminPolicy.isAllowed, company.read)
        .put(adminPolicy.isAllowed, company.update)
        .delete(adminPolicy.isAllowed, company.delete);

    // Finish by binding the user middleware
    app.param('companyId', company.companyByID);
};
