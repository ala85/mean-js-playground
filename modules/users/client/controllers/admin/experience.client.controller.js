'use strict';

angular.module('experiences.admin').controller('ExperienceController', ['$scope', '$state', 'Authentication', 'experienceResolve',
  function ($scope, $state, Authentication, experienceResolve) {
    $scope.authentication = Authentication;
    $scope.experience = experienceResolve;


    $scope.update = function (isValid) {
        if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'companyForm');

            return false;
        }

        var experience = $scope.experience;

        experience.$update(function () {
            $state.go('admin.experience', {
                experienceId: experience._id
            });
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
  }
]);
