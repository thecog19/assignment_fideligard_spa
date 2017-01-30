Fideligard.controller("stocksIndexController", ["$scope", "stocksService", "dateService", function($scope, stocksService, dateService) {
  $scope.stockData = [];
  $scope.currentDate = dateService.getCurrentDate();

  $scope.$on('dateChange', function(event) {
    $scope.currentDate = dateService.getCurrentDate();
  })

  stocksService.obtainStocks().then(function(stocks){
    $scope.stockData = stocks
  })

  $scope.objDate = function(obj) {
    var date = new Date(obj.Date);
    return date;
};

}])
