'use strict';

module.exports = function (app) {
  // User Routes
  var adminPolicy = require('../policies/admin.server.policy'),
      experience = require('../controllers/experiences.server.controller.js');


    // Users collection routes
    app.route('/api/experiences')
        .get(adminPolicy.isAllowed, experience.listExperiences);

    // Single user routes
    app.route('/api/experiences/:experienceId')
        .get(adminPolicy.isAllowed, experience.read)
        .put(adminPolicy.isAllowed, experience.update)
        .delete(adminPolicy.isAllowed, experience.delete);

    // Finish by binding the user middleware
    app.param('experienceId', experience.experienceByID);
};
