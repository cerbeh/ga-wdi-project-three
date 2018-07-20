function FavoursIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/favours'
  })
    .then(res => $scope.favours = res.data);
}

export default FavoursIndexCtrl;
