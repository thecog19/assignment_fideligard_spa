var Fideligard = angular.module("Fideligard", ["ui.router"]);

Fideligard.config(function($stateProvider, $urlRouterProvider)
  {

  $stateProvider
  .state('root',{
    url: "",
    template: "" 
  })

  .state("buying",{
    url: "buying?:date?symbol",
    views: {
      "buying": {
    templateUrl: "/js/shared/form.html",
    controller: "formController"
    }
  }
  })

  .state("history", {
    url: "history",
    views: {
      "history":{
        templateUrl: "/js/shared/history.html",
        controller: "historyController"
      }
    }

  })

  

})

