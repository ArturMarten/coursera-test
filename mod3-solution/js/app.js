(function(){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.find = function(searchTerm){
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (result) {
      narrow.found = result;
    });
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
        return item.description.indexOf(searchTerm) !== -1
      });

      // return processed items
      return foundItems;
    });
  };
}

})();
