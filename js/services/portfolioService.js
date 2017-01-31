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
    if(!stocks_history[key]){
      stocks_history[key] = {}
    } 
    if (!stocks_history[key]["buy"]){
      stocks_history[key]["buy"] = stock
    }else{
      stocks_history[key]["buy"].amount += amount
    }
    
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
    if(amount > getQuantity(date, stock.stock.Symbol)){
      return false
    }
    key = stock.Date + " " + stock.Symbol
    if(!stocks_history[key]){
      stocks_history[key] = {}
    } 
    stocks_history[key]["sell"] = stock

    price = stock.stock.Close

    removeStocks(amount, stock.Symbol, date)

    funds += price * amount

  }

  var removeStocks = function(quantity, date, symbol){
    while(quantity > 0){
      stocks = stocks_owned[symbol]
      var current_stock;
      for(stock in stocks){
        var current_stock_date = date
        if(new Date(current_stock_date) - 0 > new Date(stock.stock.Date) - 0){
          current_stock = stock
          current_stock_date = stock.stock.Date
        }
      }
      if(current_stock.quantity - quantity > 0){
        current_stock.quantity -= quantity
        quantity = 0
      }else{
        quantity -= current_stock.quantity
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
    getQuantity: getQuantity
  }

}])
