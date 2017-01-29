Fideligard.factory('dateService', [ "$rootScope",
  function($rootScope){
    var _endDate = new Date() - 0;
    var _startDate = new Date() - 15897600000;
    var currentDate = new Date() - 0;

    var changeCurrentDate = function(slideValue) {
      $rootScope.$broadcast('dateChange', currentDate);
      currentDate = _startDate + slideValue
    }

    var getDates = function() {
      return {
        endDate: _endDate,
        startDate: _startDate,
        currentDate: currentDate
      };
    }

    var getCurrentDate = function() {
      console.log("rab")
      return currentDate
    }

  return {
    changeCurrentDate: changeCurrentDate,
    getDates: getDates,
    getCurrentDate: getCurrentDate
  }

}])
