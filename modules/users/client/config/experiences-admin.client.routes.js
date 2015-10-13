'use strict';

// Setting up route
angular.module('experiences.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
        .state('admin.experiences', {
            url: '/experiences',
            templateUrl: 'modules/users/client/views/admin/list-experiences.client.view.html',
            controller: 'UserListController'
        })
        .state('admin.experience', {
            url: '/experiences/:experienceId',
            templateUrl: 'modules/users/client/views/admin/view-experience.client.view.html',
            controller: 'ExperienceController',
            resolve: {
                experienceResolve: ['$stateParams', 'Experience', function ($stateParams, Experience) {
                    return Experience.get({
                        experienceId: $stateParams.experienceId
                    });
                }]
            }
        })
      .state('admin.experience-edit', {
          url: '/experiences/:experienceId/edit',
          templateUrl: 'modules/users/client/views/admin/edit-experience.client.view.html',
          controller: 'ExperienceController',
          resolve: {
              experienceResolve: ['$stateParams', 'Experience', function ($stateParams, Experience) {
                  return Experience.get({
                      experienceId: $stateParams.experienceId
                  });
              }]
          }
      });
  }
]);
