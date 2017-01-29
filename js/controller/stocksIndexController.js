Fideligard.controller("stocksIndexController", ["$scope", "stocksService", "dateService", function($scope, stocksService, dateService) {
  $scope.stockData = [];
  $scope.currentDate = dateService.getCurrentDate();

  $scope.$on('dateChange', function(event) {
    $scope.currentDate = dateService.getCurrentDate();
  })

  stocksService.obtainStocks().then(function(response){
    $scope.stockData = response.data.query.results.quote
  })

}])
