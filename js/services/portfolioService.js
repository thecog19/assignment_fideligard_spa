Fideligard.factory('portfolioService',  [ "stocksService",
  function(stocksService){
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

    var new_stock = {}

    angular.copy(stock, new_stock)

    price = amount*new_stock.price
    if(0 > funds - price){
      return false
    }
    new_stock.amount = amount
    new_stock.type = "Buy"

    new_stock.id = index
  
    stocks_history[index] = new_stock
    index += 1
    
    addToOwned(new_stock, price)

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
    var new_stock = {}
    angular.copy(stock, new_stock)

    new_stock.type = "Sell"
    new_stock.index = index
    index += 1

    price = new_stock.stock.Close

    removeStocks(amount, date, new_stock.symbol)
    new_stock.amount = amount

    stocks_history[index] = new_stock
    
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

  var portfolioToDate = function(epoch){
    var return_array = []
    for(company in stocks_owned){
      var temp_array = []
      for(date in stocks_owned[company]){
        if((new Date(date) - 0) - 73200000 <= epoch ){
          console.log((new Date(date) - 0) + 43200000)
          clone = {}
          angular.copy(stocks_owned[company][date], clone)
          temp_array.push(clone)
        }
      }
      if(!!temp_array.length){
        return_array.push(agregate_results(temp_array, epoch))
      }
    }
    if(return_array.length === 0){
      return []
    }
    return return_array
  }

  var agregate_results = function(array, epoch){
    aggregate_object = {}
    aggregate_object.symbol = array[0].symbol
    current_stock = stocksService.getStockByEpoch(epoch)[aggregate_object.symbol]
    current_stock = stocksService.addHistorical(current_stock).stock
    aggregate_object.date = current_stock.Date
    aggregate_object.price = current_stock.Close
    aggregate_object.oneWeek = current_stock.oneWeek
    aggregate_object.oneMonth = current_stock.oneMonth
    aggregate_object.oneDay = parseFloat(current_stock.Close) - parseFloat(current_stock.Open)
    aggregate_object.cost = 0
    aggregate_object.amount = 0
    for(var i = 0; i < array.length; i++){
      aggregate_object.cost += parseFloat(array[i].price)
      aggregate_object.amount += parseFloat(array[i].amount)
    }
    aggregate_object.value =  parseFloat(aggregate_object.price) * aggregate_object.amount
    aggregate_object.profit = aggregate_object.value -  aggregate_object.cost
    return aggregate_object
  }


  return {
    getFunds: getFunds,
    modifyFunds: modifyFunds,
    makePurchase: makePurchase,
    makeSale: makeSale,
    getQuantity: getQuantity,
    returnHistory: returnHistory,
    portfolioToDate: portfolioToDate
  }

}])
