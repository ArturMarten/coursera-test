(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['user'];
function InfoController(user) {
  var infoCtrl = this;
  infoCtrl.user = user;
}

})();
