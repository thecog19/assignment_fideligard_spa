Fideligard.controller('historyController', ['$scope', 'dateService', "portfolioService",
  function($scope, dateService, portfolioService){
    $scope.buy = true
    $scope.sell = true
    $scope.history = portfolioService.returnHistory();

    var returnConditions = function(){
      //this is where I left off. 
      if(buy && sell){
        return true
      }
    }
  }]);
