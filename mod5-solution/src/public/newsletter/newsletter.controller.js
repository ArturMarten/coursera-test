(function () {
"use strict";

angular.module('public')
.controller('NewsletterController', NewsletterController);

NewsletterController.$inject = ['InfoService'];
function NewsletterController(InfoService) {
  var newsletterCtrl = this;
  var _dish;
  newsletterCtrl.dishInvalid = false;
  newsletterCtrl.saved = false;
  newsletterCtrl.submit = function(user){
    newsletterCtrl.validateDish(user.favourite_dish.short_name);
    user.favourite_dish = _dish;
    InfoService.saveUser(user);
    newsletterCtrl.saved = true;
  }

  newsletterCtrl.validateDish = function(short_name) {
    InfoService.getFavouriteDish(short_name)
    .then(function(response) {
      _dish = response;
      newsletterCtrl.dishInvalid = false;
      newsletterCtrl.newsletterForm.favourite_dish.$setValidity("favourite_dish", true);
    }, function(response) {
      newsletterCtrl.dishInvalid = true;
      newsletterCtrl.newsletterForm.favourite_dish.$setValidity("favourite_dish", false);
    });
  }
}

})();
