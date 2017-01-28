Fideligard.controller("stocksIndexController", ["$scope", "stocksService", "dateService", function($scope, stocksService, dateService) {
  $scope.stockData = [];
  $scope.currentDate = dateService.currentDate;

  stocksService.obtainStocks().then(function(response){
    $scope.stockData = response.data.query.results.quote
  })

}])
