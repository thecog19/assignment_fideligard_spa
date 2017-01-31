Fideligard.factory('portfolioService',  [ "stocksService",
  function(stockService){
  var funds = 100000
  var stocks_history = {}
  var stocks_owned = {}
  var index = 0


  var returnHistory = function(){
    return stocks_history
  }
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
    stock.type = "Buy"

    stocks_history[index] = stock

    index += 1
    
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
    if(!stocks_owned[owned.symbol][owned.stock.Date]){
      stocks_owned[owned.symbol][owned.stock.Date] = owned
    }else{
      stocks_owned[owned.symbol][owned.stock.Date].amount = parseFloat(owned.amount) + parseFloat(stocks_owned[owned.symbol][owned.stock.Date].amount)
    }
  }

  var makeSale = function(amount, stock, date){

    if(amount > getQuantity(date, stock.stock.Symbol)){
      return false
    }

    stock.type = "Sell"
    
    stocks_history[index] = stock

    price = stock.stock.Close

    removeStocks(amount, date, stock.symbol)

    funds += price * amount

  }

  var removeStocks = function(quantity, date, symbol){
    while(quantity > 0){
      stocks = stocks_owned[symbol]
      var current_stock;
      for(current_stock_date in stocks){
        stored_date = date
        if(new Date(stored_date) - 0 >= new Date(current_stock_date) - 0){
          current_stock = stocks[current_stock_date]
          stored_date = current_stock_date
        }
      }
      if(current_stock.amount - quantity > 0){
        current_stock.amount =  parseFloat(current_stock.amount) - quantity
        quantity = 0
      }else{
        quantity -= parseFloat(current_stock.amount)
        delete stocks[current_stock.stock.Date]
      }
    }
  }

  var getQuantity = function(date, symbol){
    stocks = stocks_owned[symbol]
    count = 0
    for(purchase_date in stocks){
      if(new Date(date) - 0 >= new Date(purchase_date) - 0){
        count += parseFloat(stocks[purchase_date].amount)
      }
    }
    return count
  }


  return {
    getFunds: getFunds,
    modifyFunds: modifyFunds,
    makePurchase: makePurchase,
    makeSale: makeSale,
    getQuantity: getQuantity,
    returnHistory: returnHistory
  }

}])
