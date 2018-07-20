function UsersIndexCtrl($scope, $http){

  $http({
    method: 'GET',
    url: '/api/users'
  })
    .then(res => {
      $scope.usersTopFive = res.data
        .sort((a, b) => {
          return b.points - a.points;
        })
        .slice(0,5);
      $scope.usersRest = res.data
        .sort((a, b) => {
          return b.points - a.points;
        })
        .slice(5);
    });
}

export default UsersIndexCtrl;
