(function(){
'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showToBuy = this;

  showToBuy.items = ShoppingListCheckOffService.getToBuyItems();

  showToBuy.buyItem = function(index) {
    ShoppingListCheckOffService.removeToBuyItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showBought = this;

  showBought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService () {
  var service = this;

  var toBuyItems = [{ name: "cookies", quantity: 10 },
                    { name: "bag of chips", quantity: 5 },
                    { name: "chocolates bars", quantity: 2},
                    { name: "sugary drinks", quantity: 3},
                    { name: "banana", quantity: 1}];
  var boughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  }

  service.getBoughtItems = function () {
    return boughtItems;
  }

  service.removeToBuyItem = function (index) {
    var item = toBuyItems.splice(index,1)[0];
    boughtItems.push(item);
  }
}
})();
