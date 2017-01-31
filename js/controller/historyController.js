Fideligard.controller('historyController', ['$scope', 'dateService', "portfolioService",
  function($scope, dateService, portfolioService){

    $scope.history = portfolioService.returnHistory();

  }]);
