Fideligard.controller('SliderController', ['$scope', 'dateService',
  function($scope, dateService){

    $scope.dates = dateService.getDates();

    $scope.changeCurrentDate = function(slide) {
      dateService.changeCurrentDate(slide);
      $scope.dates.currentDate = dateService.getCurrentDate()
    }

  }]);
