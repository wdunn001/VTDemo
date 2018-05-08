'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MainCtrl', function ($scope, toaster, $uibModal, manageState, modalService) {

    $scope.manageState = manageState;

    $scope.result = '';
    $scope.query = '';
    $scope.search = search;
    $scope.checkAssigned = checkAssigned;
    $scope.addOn = false;
    $scope.vehicleSelect = "0";
    $scope.cameraSelect = "0";
    $scope.addAssignment = addAssignment;
    $scope.addCamera = function() {
      $uibModal.open({
        templateUrl: 'views/addcamera.html',
        controller: 'ModalCtrl',
        controllerAs: 'modal'
      });
    };

    $scope.addVehicle = function() {
      $uibModal.open({
        templateUrl: 'views/addvehicle.html',
        controller: 'ModalCtrl',
        controllerAs: 'modal'
      });
    };
    function activate() {
      manageState.generateMock();
      search();
      $scope.$watch(function () { return manageState.assignments; }, function () {
          search();
        });
    }
    activate();
    function checkAssigned() {
      var currentAssignment = manageState.findCameraAssignmentById($scope.cameraSelect);
      if ( currentAssignment !== undefined) {
        manageState.workingObject = currentAssignment;
        modalService.createModal(
          'warning','This camera already has an assignment. Would you like to remove the assignment?','Yes','No');
      }
    }

    function addAssignment() {
      if ($scope.vehicleSelect !== "0" && $scope.cameraSelect !== "0") {
       var success = manageState.checkAndAddAssignment($scope.vehicleSelect, $scope.cameraSelect);
       if (success) {
         $scope.addOn = !$scope.addOn;
         $scope.vehicleSelect = "0";
         $scope.cameraSelect = "0";
       }
      } else {
        toaster.pop('warning', '', 'You must make a selection first');
      }

    }
    function search() {
      $scope.result = manageState.searchAssignments($scope.query);
    }
  });
