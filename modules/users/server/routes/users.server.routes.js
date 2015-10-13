'use strict';

module.exports = function (app) {
  // User Routes
  var adminPolicy = require('../policies/admin.server.policy'),
      users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me')
      .get(adminPolicy.isAllowed, users.me);

  app.route('/api/users/accounts')
      .delete(adminPolicy.isAllowed, users.removeOAuthProvider);

  app.route('/api/users/password')
      .post(adminPolicy.isAllowed, users.changePassword);

  app.route('/api/users/picture')
      .post(adminPolicy.isAllowed, users.changeProfilePicture);

    // Users collection routes
  app.route('/api/users')
      .get(adminPolicy.isAllowed, users.listUsers);

    // Single user routes
  app.route('/api/users/:userId')
      .get(adminPolicy.isAllowed, users.read)
      .put(adminPolicy.isAllowed, users.update)
      .delete(adminPolicy.isAllowed, users.delete);

    // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
