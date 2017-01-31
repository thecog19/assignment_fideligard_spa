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
    $scope.owned = portfolioService.getQuantity($scope.date, $scope.symbol)

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

    $scope.sellValidity = function(){
      console.log($scope.quantity)
      if($scope.quantity > $scope.owned){
        $scope.buyForm.quantity.$setValidity("cost", false)
        $scope.validity = "Not Valid!"
        return false
      }else{
        $scope.buyForm.quantity.$setValidity("cost", true)
        $scope.validity = "Valid"
        return true
      }
    }

    $scope.validityCheck = function(){
      if($scope.type = "Buy"){
        $scope.purchaseValidity()
      }else{
        $scope.sellValidity()
      } 
    }

    $scope.buyStock = function(){
      if($scope.purchaseValidity()){
        $scope.messageDispay = true
        $scope.message = "You purchased " + $scope.quantity  + "stocks in " + $scope.symbol + " on " + $scope.date
        portfolioService.makePurchase($scope.quantity, $scope.stock)
        $scope.funds = portfolioService.getFunds()
        $scope.owned = portfolioService.getQuantity($scope.date, $scope.symbol)
      }else{
        $scope.messageDispay = true
        $scope.message = "Available funds exceeded"
      }
    }

    $scope.sellStock = function(){
      if($scope.sellValidity()){
        $scope.messageDispay = true
        $scope.message = "You sold " + $scope.quantity  + "stocks in " + $scope.symbol + " on " + $scope.date
        portfolioService.makeSale($scope.quantity, $scope.stock)
        $scope.funds = portfolioService.getFunds()
        $scope.owned = portfolioService.getQuantity($scope.date, $scope.symbol)
      }else{
         $scope.messageDispay = true
        $scope.message = "You CANNOT sell what you do not own!"
      }
      
    }

    $scope.commitAction = function(){
      if($scope.type === "Buy"){
        $scope.buyStock()
      }else{
        $scope.sellStock()
      }
    }

  }]);
