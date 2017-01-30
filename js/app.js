var Fideligard = angular.module("Fideligard", ["ui.router"]);

Fideligard.config(function($stateProvider, $urlRouterProvider)
  ){

  $stateProvider.state('root',{
    url: "",
    views: {
      "buying": {
        template: "<h1> THIS ROUTE WORKS </h1>"
        controller: function($scope){$scope.test = "test"}
      }
    }
  })

  

})

