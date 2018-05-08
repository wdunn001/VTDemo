'use strict';
 function modalService( toaster, $uibModal) {

    function createModal(header, message, confirm, decline) {
      service.header = header;
      service.message = message;
      service.confirm = confirm;
      service.decline = decline;
      $uibModal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl',
        controllerAs: 'modal'
      });
    }

    var service = {
      createModal: createModal,
      header: '',
      message: '',
      confirm: '',
      decline: '',
      onConfirm: '',
      onDecline: ''

    };
    return service;

  }

  angular.module('angularjsApp')
  .service('modalService', modalService);
