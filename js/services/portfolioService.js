Fideligard.factory('portfolioService',  [ "stocksService",
  function(stockService){
  var funds = 100000
  var stocks_owned = {}

  var modifyFunds = function(amount){
    funds += amount
  }

  var getFunds = function(){
    return funds
  }

  var makePurchase = function(amount, stock){
    price = amount*stock.Close
    if(0 < funds - price){
      return false
    }
    stock.amount = amount
    key = stock.Date + " " + stock.Symbol
    stocks_owned[key] = stock
    funds -= amount
  }

  var makeSale = function(amount, stock, date){
    key = stock.Date + " " + stock.Symbol
    if(stocks_owned[key].amount - amount < 0){
      return false
    }

    stocks_owned[key].amount - amount

    price = stocksService.getStock(date, stock.Symbol).Close

    if(stocks_owned[key].amount === 0){
      delete stocks_owned[key]
    }
    //actually need to find the current price
    funds += price * amount

  }


  return {
    getFunds: getFunds,
    modifyFunds: modifyFunds,
    makePurchase: makePurchase
  }

}])
