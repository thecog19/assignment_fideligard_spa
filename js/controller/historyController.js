Fideligard.controller('historyController', ['$scope', 'dateService', "portfolioService",
  function($scope, dateService, portfolioService){
    $scope.buy = true
    $scope.sell = true
    $scope.history = portfolioService.returnHistory();

    var checkDate = function(date){
      return new Date(date) - 0
    }

    var toggleBuy = function(){
      $scope.buy = !$scope.buy
    }

    var toggleSell = function(){
      $scope.sell = !$scope.sell
    }
  }]);
