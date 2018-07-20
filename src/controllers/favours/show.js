function FavoursShowCtrl($scope, $http, $state) {
  $scope.data = {};

  $scope.isOwner = false;
  $scope.isChosenVolunteer = false;
  $scope.canVolunteer = true;

  $scope.addComment = function(){
    $http({
      method: 'POST',
      url: `api/favours/${$state.params.id}/comments`,
      data: $scope.data
    })
      .then(res => {
        $scope.favour = res.data;
        $scope.data.content = '';
      });
  };

  $scope.removeComment = function(comment){
    $http({
      method: 'DELETE',
      url: `api/favours/${$state.params.id}/comments/${comment._id}`,
      data: $scope.data
    })
      .then(res => {
        $scope.favour = res.data;
      });
  };

  $http({
    method: 'GET',
    url: `api/favours/${$state.params.id}`
  })
    .then(res => {
      $scope.favour = res.data;
      if($scope.favour.owner._id === $scope.currentUser._id) $scope.isOwner = true;
      if(!$scope.isAuthenticated() || $scope.favour.owner._id === $scope.currentUser._id) $scope.canVolunteer = false;
      if(!$scope.isAuthenticated() || $scope.favour.owner._id === $scope.currentUser._id || $scope.favour.status !== 'tender') $scope.canVolunteer = false;
      if($scope.favour.chosen_volunteers.length > 0 && $scope.favour.chosen_volunteers[0]._id === $scope.currentUser._id) $scope.isChosenVolunteer = true;
      $scope.favour.volunteers.forEach(volunteer => {
        if(volunteer._id === $scope.currentUser._id) return $scope.canVolunteer = false;
      });
    });

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
      .then(res => {
        $scope.favour = res.data;
      });
    $scope.canVolunteer = false;
  };

  $scope.chooseVolunteer = function(volunteer){
    $http({
      method: 'POST',
      url: `api/favours/${$state.params.id}/volunteers/${volunteer._id}`
    })
      .then(() => $state.go($state.current, {}, {reload: true}));
  };

  $scope.changeStatus = function(){
    $http({
      method: 'PUT',
      url: `api/favours/${$state.params.id}/status`
    })
      .then(() => $scope.canVolunteer = false)
      .then(() => $state.go($state.current, {}, {reload: true}));
  };
}

export default FavoursShowCtrl;
