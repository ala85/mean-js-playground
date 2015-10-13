'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin', 'Company', 'Experience',
  function ($scope, $filter, Admin, Company, Experience) {

    $scope.itemsPerPage = 3;
    $scope.currentPage = 1;

    var promises = [];

    promises.push(Admin.query().$promise);

    promises.push(Company.query().$promise);
    promises.push(Experience.query().$promise);

      Promise.all(promises)
          .then(function (res) {
              $scope.users = res[0];
              $scope.companies = res[1];
              $scope.experiences = res[2];
              $scope.buildPager();
          });

    $scope.buildPager = function () {
      $scope.pagedUserItems = [];
      $scope.pagedCompanyItems = [];
      $scope.pagedExperienceItems = [];
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredUserItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterUserLength = $scope.filteredUserItems.length;

      $scope.filteredCompanyItems = $filter('filter')($scope.companies, {
        $: $scope.search
      });
      $scope.filterCompanyLength = $scope.filteredCompanyItems.length;

      $scope.filteredExperienceItems = $filter('filter')($scope.experiences, {
         $: $scope.search
      });
      $scope.filterExperienceLength = $scope.filteredExperienceItems.length;

      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      $scope.pagedUserItems = $scope.filteredUserItems.slice(begin, end);
      $scope.pagedCompanyItems = $scope.filteredCompanyItems.slice(begin, end);
      $scope.pagedExperienceItems = $scope.filteredExperienceItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
