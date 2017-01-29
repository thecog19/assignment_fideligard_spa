Fideligard.factory('stocksService', [ "$http",
  function($http){
    var _start = "2016-06-20"
    var _end = "2016-12-19"

  var obtainStocks = function(){
      return $http({
        method: "GET",
        url: urlBuilder(["AAPL", "YAOO", "GOOG", "MSFT"]),
        success: function(response){return response},
        failire: function(response){console.log(response)}
      })
    }

  var sanitizeStocks = function(response){
    //for each stock, generate the 30d, 7d, 1d prices
    //and populate the object with them
  }

  var urlBuilder = function(companyArray) {
    var companyString = "'" + companyArray.join("','") + "'";
    var startDate = _start.replace(/-/g, '/');
    var endDate = _end.replace(/-/g, '/');

    return 'http://query.yahooapis.com/v1/public/yql?q=' +
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
    obtainStocks: obtainStocks
  }

}])
