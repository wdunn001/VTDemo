'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the angularjsApp
 */

angular.module('angularjsApp')
  .controller('ModalCtrl', function ($scope, $uibModalInstance, $rootScope, manageState, toaster, modalService) {
    $scope.manageState = manageState;
    $scope.modalService = modalService;
    $scope.cameraName = '';
    $scope.addCamera = addCamera;
    $scope.vehicleName = '';
    $scope.addVehicle = addVehicle;

    function addCamera() {
      if ($scope.cameraName.length > 0) {
      manageState.addCamera($scope.cameraName);
      $uibModalInstance.dismiss();
      } else {toaster.pop('success', '', 'Camera device number is to short.');}
    }

    function addVehicle() {
      if ($scope.vehicleName.length > 0) {
      manageState.addVehicle($scope.vehicleName);
      $uibModalInstance.dismiss();
      } else {toaster.pop('success', '', 'Vehicle name is to short.');}
    }
    $scope.removeAssignment = function () {
    manageState.removeAssignment(manageState.workingObject.id);
    };
    $scope.close = function close() {
      $uibModalInstance.dismiss();
    };

  });
