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

    $scope.messageDispay = false

    $scope.purchaseValidity = function(){
      if($scope.quantity * $scope.price > $scope.funds){
        $scope.buyForm.quantity.$setValidity("cost", false)
        $scope.validity = "Not Valid!"
        return false
      }else{
        $scope.buyForm.quantity.$setValidity("cost", true)
        $scope.validity = "Valid"
        return true
      }
    }

    $scope.buyStock = function(){
      if($scope.purchaseValidity()){
        $scope.messageDispay = true
        $scope.message = "You purchased " + $scope.quantity  + "stocks in " + $scope.symbol + " on " + $scope.date
        portfolioService.makePurchase($scope.quantity, $scope.stock)
        $scope.funds = portfolioService.getFunds()
      }else{
        $scope.messageDispay = true
        $scope.message = "Available funds exceeded"
      }
    }

    $scope.commitAction = function(){
      if($scope.type === "Buy"){
        $scope.buyStock()
      }
    }

  }]);
