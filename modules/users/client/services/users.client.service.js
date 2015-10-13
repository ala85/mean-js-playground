'use strict';


angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {

    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
        query: {
            method:'GET',
            isArray:true
        }
    });
  }
]);