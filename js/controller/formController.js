Fideligard.controller('formController', ['$scope', '$stateParams', "stocksService", "portfolioService",
  function($scope, $stateParams, stocksService, portfolioService){
    $scope.date = $stateParams.date
    $scope.symbol = $stateParams.symbol
    $scope.stock = stocksService.getStock($scope.date, $scope.symbol)
    $scope.price = $scope.stock.price
    $scope.quantity = 1
    $scope.type = "Buy"
    $scope.funds = portfolioService.getFunds()
    $scope.validity = "Valid"

  }]);
