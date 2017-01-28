Fideligard.directive('datePicker', ["dateService", function(dateService) {
  return {
    restrict: "E",
    templateUrl: "/js/directives/datePicker.html",
    scope: true
  }
}])
