'use strict';

// Setting up route
angular.module('companies.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
        .state('admin.companies', {
            url: '/companies',
            templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
            controller: 'UserListController'
        })
        .state('admin.company', {
            url: '/companies/:companyId',
            templateUrl: 'modules/users/client/views/admin/view-company.client.view.html',
            controller: 'CompanyController',
            resolve: {
                companyResolve: ['$stateParams', 'Company', function ($stateParams, Company) {
                    return Company.get({
                        companyId: $stateParams.companyId
                    });
                }]
            }
        })
      .state('admin.company-edit', {
          url: '/companies/:companyId/edit',
          templateUrl: 'modules/users/client/views/admin/edit-company.client.view.html',
          controller: 'CompanyController',
          resolve: {
              companyResolve: ['$stateParams', 'Admin', 'Company', function ($stateParams, Admin, Company) {
                  return Company.get({
                      companyId: $stateParams.companyId
                  });
              }]
          }
      });
  }
]);
