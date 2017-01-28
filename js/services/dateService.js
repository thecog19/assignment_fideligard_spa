Fideligard.factory('dateService', [ "$http",
  function($http){
    var _endDate = new Date() - 0;
    var _startDate = new Date() - 15897600000;
    var currentDate = new Date() - 0;

    var changeCurrentDate = function(slideValue) {
      currentDate = new Date() - (slideValue * -1)
    }

    var getDates = function() {
      return {
        endDate: _endDate,
        startDate: _startDate,
        currentDate: currentDate
      };
    }

    var getCurrentDate = function() {
      return currentDate
    }

  return {
    changeCurrentDate: changeCurrentDate,
    getDates: getDates,
    getCurrentDate: getCurrentDate
  }

}])
