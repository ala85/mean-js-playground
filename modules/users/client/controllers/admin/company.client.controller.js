'use strict';

angular.module('companies.admin').controller('CompanyController', ['$scope', '$state', 'Authentication', 'companyResolve',
  function ($scope, $state, Authentication, companyResolve) {
    $scope.authentication = Authentication;
    $scope.company = companyResolve;


    $scope.update = function (isValid) {
        if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'companyForm');

            return false;
        }

        var company = $scope.company;

        company.$update(function () {
            $state.go('admin.company', {
                companyId: company._id
            });
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
  }
]);
