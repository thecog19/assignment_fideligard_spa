Fideligard.factory('dateService', [ "$rootScope",
  function($rootScope){
    var _endDate = new Date(2016,12,20) -31536000000;
    var _startDate = new Date(2016,12,20) - 0;
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
      return currentDate
    }

  return {
    changeCurrentDate: changeCurrentDate,
    getDates: getDates,
    getCurrentDate: getCurrentDate
  }

}])
