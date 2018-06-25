function FavoursShowCtrl($scope, $http, $state) {
  $http({
    method: 'GET',
    url: `api/favours/${$state.params.id}`
  })
    .then(res => $scope.favour = res.data);

  $scope.deleteFavour = function(){
    $http({
      method: 'DELETE',
      url: `api/favours/${$state.params.id}`
    })
      .then(() => $state.go('favourIndex'));
  };

  $scope.claimFavour = function() {
    $http({
      method: 'POST',
      url: `/api/favours/${$state.params.id}/volunteers`
    })
      .then(res => $scope.favour = res.data);
  };
}

export default FavoursShowCtrl;
