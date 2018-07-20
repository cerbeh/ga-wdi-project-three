function FavoursNewCtrl($scope, $http, $state) {
  $scope.data = {};

  $scope.enoughPoints = true;

  $scope.updateLocation = function(location) {
    $scope.data.location = location;
    $scope.$apply();
  };

  $scope.checkPoints = function() {
    if ($scope.data.points > $scope.currentUser.points) return $scope.enoughPoints = false;
    else return $scope.enoughPoints = true;
  };

  $scope.createFavour = function() {
    $http({
      method: 'POST',
      url: '/api/favours',
      data: $scope.data
    })
      .then(() => {
        $scope.currentUser.points = $scope.currentUser.points - $scope.data.points;
        $state.go('home');
      });
  };
}

export default FavoursNewCtrl;
