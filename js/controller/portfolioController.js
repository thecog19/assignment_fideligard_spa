Fideligard.controller('portfolioController', ['$scope', 'dateService', "portfolioService",
  function($scope, dateService, portfolioService){

    $scope.date = dateService.getCurrentDate();
    $scope.portfolio = portfolioService.portfolioToDate($scope.date);

    $scope.$on('dateChange', function(event) {
      $scope.date = dateService.getCurrentDate();
      $scope.portfolio = portfolioService.portfolioToDate($scope.date);
    })


  }]);
