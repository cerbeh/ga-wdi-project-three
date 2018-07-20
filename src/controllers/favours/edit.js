function FavoursEditCtrl($http, $scope, $state) {

  $scope.enoughPoints = true;

  $scope.updateLocation = function(location) {
    $scope.data.location = location;
    $scope.$apply();
  };

  $scope.checkPoints = function() {
    if ($scope.data.points > $scope.currentUser.points) return $scope.enoughPoints = false;
    else return $scope.enoughPoints = true;
  };

  $scope.updateFavour = function() {
    $http({
      method: 'PUT',
      url: `api/favours/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('favourShow', { id: $state.params.id }));
  };

  $http({
    method: 'GET',
    url: `api/favours/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
    });
}

export default FavoursEditCtrl;
