function UsersShowCtrl($scope, $http, $state){
  $scope.isOwner = false;

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then( res => {
      $scope.user = res.data;
      if($scope.user._id === $scope.currentUser._id) $scope.isOwner = true;
    });

  $scope.deleteUser = function(){
    $http({
      method: 'DELETE',
      url: `api/users/${$state.params.id}`
    })
      .then(() => $state.go('usersIndex'));
  };
}

export default UsersShowCtrl;
