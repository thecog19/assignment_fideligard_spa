Fideligard.factory('stocksService', [ "$http",
  function($http){
    var _start = "2014-09-11"
    var _end = "2015-07-11"

  var obtainStocks = function(){
      return $http({
        method: "GET",
        url: urlBuilder(["AAPL", "YAOO", "GOOG", "MSFT"]),
        success: function(response){return response},
        failire: function(response){console.log(response)}
      })
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
