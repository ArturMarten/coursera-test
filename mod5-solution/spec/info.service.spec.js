describe("InfoService", function() {
  var service;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      service = $injector.get('InfoService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return favourite dish', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond({"id":1, "short_name":"A1"});
    service.getFavouriteDish('A1').then(function(response) {
      expect(response).toEqual({"id":1, "short_name":"A1"});
    });
    $httpBackend.flush();
  });

});
