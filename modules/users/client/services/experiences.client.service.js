'use strict';


angular.module('experiences.admin').factory('Experience', ['$resource',
    function ($resource) {
        return $resource('api/experiences/:experienceId', {
            experienceId: '@_id'
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
