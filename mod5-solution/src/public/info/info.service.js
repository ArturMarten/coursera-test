(function () {
"use strict";

angular.module('public')
.service('InfoService', InfoService);

InfoService.$inject = ['$http', 'ApiPath'];
function InfoService($http, ApiPath) {
  var service = this;
  var _user;

  service.getFavouriteDish = function (short_name) {
    return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function (response) {
      return response.data;
    });
  };

  service.saveUser = function (user) {
    _user = user;
  }

  service.getUser = function () {
    return _user;
  }

}

})();
