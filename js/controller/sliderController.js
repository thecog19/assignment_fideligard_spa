store.controller('CheckoutCtrl', ['$scope',
  function($scope){
    $scope.dateSelector = true

    $scope.toggleSelector = function(){
      $scope.dateSelector = !$scope.dateSelector
    }
  }]);