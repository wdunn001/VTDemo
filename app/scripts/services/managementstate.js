'use strict';
 function manageState($rootScope, toaster, modalService) {
    function searchAssignments(query) {
      if (query.length > 0) {
        return service.assignments.filter(function (assignment) {
          if (service.cameras[assignment.deviceId - 1].deviceNo.toLowerCase().indexOf(query.toLowerCase()) >= 0  || service.vehicles[assignment.vehicleId - 1].name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
          { return assignment; }
        });
      } else {return service.assignments;}
    }
    function addCamera(deviceNo, dontPop) {
      var newId = service.cameras.length + 1;
      service.cameras.push({id: newId, deviceNo: deviceNo});
      if (dontPop !== true) {
        toaster.pop('success', '', deviceNo + ' added');
      }
      return newId;
    }

    function addVehicle(name, dontPop) {
      var newId = service.vehicles.length + 1;
      service.vehicles.push({id: newId, name: name});
      if (dontPop !== true) {
        toaster.pop('success', '', name + ' added');
      }
      return newId;
    }

    function checkAndAddAssignment( vehicleId, deviceId ) {
      var cameraAssignment = findCameraAssignmentById(deviceId);
      if ( cameraAssignment === undefined) {
        addAssignment(vehicleId, deviceId);
        toaster.pop('success', '', service.cameras[deviceId - 1].deviceNo + ' has been assigned');
        return true;
      }
      else {
        toaster.pop('error', '', service.cameras[deviceId - 1].deviceNo + ' previous assignment must first be removed');
        return false;
      }

    }
    function addAssignment(vehicleId, deviceId , mockDate) {
      var newDate = mockDate ? randomDate(new Date(2012, 0, 1), new Date()) : new Date();
      service.assignments.push({id: service.assignments.length + 1, vehicleId: vehicleId, deviceId: deviceId, dateCreated: newDate, deleted: false});
    }
    function removeCamera(id) {
      service.cameras.splice(id - 1, 1);

    }

    function removeVehicle(id) {
      service.vehicles.splice(id - 1, 1);

    }
    function removeAssignment(id) {
      service.assignments.splice(id - 1, 1);

    }

    function findCameraAssignmentById(deviceId){
      var foundAssignment;
      var length = service.assignments.length -1;
      var idx = 0;
      for (idx; idx <= length; idx++) {
        var assignment = service.assignments[idx];
        if (assignment.deviceId == deviceId) {
          foundAssignment = assignment;
          break;
        }
      }
      return foundAssignment;
    }

    function generateMock() {

      var length = 10;
      var idx = 0;
      for (idx; idx <= length; idx++) {
         var vehicleId = addVehicle(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), true);
         var cameraId = addCamera(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), true);
         addAssignment(vehicleId, cameraId, true);
      }
    }

    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

    var service = {
      vehicles: [{id: 1, name: 'Nissan 370z Nismo'}],
      cameras: [{id: 1, deviceNo: '123-123-123'}],
      assignments: [{id: 1, vehicleId: 1, deviceId: 1, dateCreated: new Date(), deleted: false }],
      workingObject: {},
      addCamera: addCamera,
      addVehicle: addVehicle,
      checkAndAddAssignment: checkAndAddAssignment,
      addAssignment: addAssignment,
      removeCamera: removeCamera,
      removeVehicle: removeVehicle,
      removeAssignment: removeAssignment,
      searchAssignments: searchAssignments,
      findCameraAssignmentById: findCameraAssignmentById,
      generateMock: generateMock
    };
    return service;

  }

  angular.module('angularjsApp')
  .service('manageState', manageState);
