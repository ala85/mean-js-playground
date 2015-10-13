'use strict';


angular.module('companies.admin').factory('Company', ['$resource',
    function ($resource) {
        return $resource('api/companies/:companyId', {
            companyId: '@_id'
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
