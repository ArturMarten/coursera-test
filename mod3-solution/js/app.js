(function(){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsTemplate.html',
    restrict: 'E',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrow',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.find = function(searchTerm){
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (result) {
      narrow.found = result;
    });
  }

  narrow.remove = function(index){
    narrow.found.splice(index,1);
  }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({url: "https://davids-restaurant.herokuapp.com/menu_items.json"}).then(function (result) {
      // process result and only keep items that match
      var foundItems = result.data.menu_items;

      foundItems = foundItems.filter(function(item){
        return searchTerm !== "" && item.description.indexOf(searchTerm) !== -1
      });

      // return processed items
      return foundItems;
    });
  };
}

})();
