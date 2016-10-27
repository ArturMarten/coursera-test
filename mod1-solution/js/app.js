(function () {
'use strict';

angular.module('LunchCheck',[])

.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.lunch = "";
  $scope.message = "";
  $scope.checkLunch = function(){
    if ($scope.lunch === "") {
      $scope.messageStyle = {"color":"red"};
      $scope.textboxStyle = {"border": "1px solid red"};
      $scope.message = "Please enter data first";
    } else {
      $scope.messageStyle = {"color":"green"}
      $scope.textboxStyle = {"border": "1px solid green"};
      function isNotEmpty(item) {
         return item.trim().length > 0;
      }
      switch ($scope.lunch.split(",").filter(isNotEmpty).length) {
        case 1:
        case 2:
        case 3:
          $scope.message = "Enjoy!";
          break;
        default:
          $scope.message = "Too much!";
          break;
      }
    }
  };
}

})();
