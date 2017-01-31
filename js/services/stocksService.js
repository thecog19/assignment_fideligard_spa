Fideligard.factory('stocksService', [ "$http",
  function($http){
    var _start = "2016-05-20"
    var _end = "2017-01-19"

    var stocksByDate = {}
    var missing_stocks = []

  var getStock = function(date, symbol){
    return stocksByDate[date][symbol]
  }

  

  var obtainStocks = function(){
      return $http({
        method: "GET",
        url: urlBuilder(["AAPL", "DB", "GOOG", "MSFT"]),
      }).then(function(response){
          var data = response.data.query.results.quote;
          buildStocksByDate(data)
          sanitizeData()
          addHistorical(data.concat(missing_stocks))
          return data.concat(missing_stocks)
      })
    }

  var addHistorical = function(data){
    for(var i = 0; i < data.length; i++){
      date = data[i].Date
      data[i].oneWeek = getDiff(7, data[i])
      data[i].oneMonth = getDiff(30, data[i])
    }
    return data
  }

  var getDiff = function(days, stock){
    epoch = new Date(stock.Date)
    epoch -= 86400000*days
    diffStock = getStockByEpoch(epoch)
    if(!diffStock){
      diffStock = {}
      diffStock[stock.Symbol] = {price: 0}
    }
    price = diffStock[stock.Symbol].price
    if(!price){
      price = stock.Close
    }
    return parseFloat(stock.Close) - parseFloat(price)
  }

  var getStockByEpoch = function(epoch){
    date = generateDateString(epoch)
    return stocksByDate[date];
  }

  var buildStocksByDate = function(data){
    for (var i = 0; i < data.length; i++) {
      newStock = {};
      stockData = data[i];
      date = stockData['Date'];
      stocksForDate = stocksByDate[date];
      if (!stocksForDate){
        stocksForDate = stocksByDate[date] = {};
      }
      newStock.price = stockData['Close'];
      newStock.symbol = stockData['Symbol'];
      newStock.stock = data[i]
      stocksForDate[newStock.symbol] = newStock;
      }
  }

  var sanitizeData = function(){
    var current_date = new Date(_end)
    var symbols = ["AAPL", "DB", "GOOG", "MSFT"]
    var lastStock = stocksByDate[generateDateString(current_date)]
    for(var i = Object.keys(stocksByDate).length -1; i > 0; i--){
      current_date -= 86400000
      current_date_str = generateDateString(current_date)
      if(!stocksByDate[current_date_str]){
        var stock = {}
        angular.copy(lastStock, stock)
        for(var j = 0; j < symbols.length; j++){
          new_stock = {} 
          angular.copy(lastStock[symbols[j]].stock, new_stock)
          new_stock.Date = current_date_str
          missing_stocks.push(new_stock)
        }
        stocksByDate[current_date_str] = stock
      }
      lastStock = stocksByDate[current_date_str]
    }
  }


  var generateDateString = function(epochTime){
    date = new Date(epochTime)
    year = date.getFullYear()
    month = date.getMonth() + 1
    month = month.toString()
    if(month.length === 1){
      month = "0" + month
    }
    day = date.getDate()
    day = day.toString()
     if(day.length === 1){
      day = "0" + day
    }

    date_str = year + "-" + month + "-" + day
    return date_str
  }

  var urlBuilder = function(companyArray) {
    var companyString = "'" + companyArray.join("','") + "'";
    var startDate = _start.replace(/-/g, '/');
    var endDate = _end.replace(/-/g, '/');

    return 'https://query.yahooapis.com/v1/public/yql?q=' +
              'select * from yahoo.finance.historicaldata ' +
              'where symbol in (' + companyString + ') ' +
              'and startDate = "' + startDate + '" ' +
              'and endDate = "' + endDate + '" ' +
              '&format=json '+
              '&diagnostics=true ' +
              '&env=store://datatables.org/alltableswithkeys ' +
              '&callback=';
  };


  return {
    obtainStocks: obtainStocks,
    getStock: getStock,
    getStockByEpoch: getStockByEpoch,
    addHistorical: addHistorical
  }

}])
