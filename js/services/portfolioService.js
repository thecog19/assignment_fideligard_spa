Fideligard.factory('portfolioService',  [ "stocksService",
  function(stockService){
  var funds = 100000
  var stocks_history = {}
  var stocks_owned = {}

  var modifyFunds = function(amount){
    funds += amount
  }

  var getFunds = function(){
    return funds
  }

  var makePurchase = function(amount, stock){
    price = amount*stock.price
    if(0 > funds - price){
      return false
    }
    stock.amount = amount
    key = stock.stock.Date + " " + stock.symbol
    stocks_history[key] = stock
    console.log(stocks_history)
    addToOwned(stock, price)

    funds -= price
  }


  var addToOwned = function(stock, price){
    owned = {}
    angular.copy(stock, owned)
    owned.cost = price
    if(!stocks_owned[owned.symbol]){
      stocks_owned[owned.symbol] = {}
    }
    stocks_owned[owned.symbol][owned.stock.Date] = owned

  }

  var makeSale = function(amount, stock, date){
    //needs to be refactored, find all stock with the same symbol but varying dates after current date. 
    key = stock.Date + " " + stock.Symbol
    if(stocks_history[key].amount - amount < 0){
      return false
    }

    stocks_history[key].amount - amount

    price = stocksService.getStock(date, stock.Symbol).Close

    if(stocks_history[key].amount === 0){
      stocks_history[key].sold = true
    }
    //actually need to find the current price
    funds += price * amount

  }


  return {
    getFunds: getFunds,
    modifyFunds: modifyFunds,
    makePurchase: makePurchase,
    makeSale: makeSale
  }

}])
