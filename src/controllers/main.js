function MainCtrl($scope, $state, $transitions, $auth, $rootScope, $timeout) {
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.navbarOpen = false;

  $scope.currentUser = $auth.getPayload() && $auth.getPayload().currentUser;

  $scope.setCurrentUser = function() {
    return $scope.currentUser = $auth.getPayload().currentUser;
  };

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => {
      $scope.flashMessage = null;
    }, 4000);
  });

  // $rootScope.$on('loggedIn', (e, data) => {
  //   $scope.currentUser = data;
  // });


  $transitions.onSuccess({}, () => {
    $scope.navbarOpen = false;
    $scope.isHomepage = $state.$current.name === 'home';
  });

  $scope.toggleMenu = function() {
    $scope.navbarOpen = !$scope.navbarOpen;
  };

  $scope.logout = function() {
    $auth.logout();
    $scope.currentUser = null;
    $state.go('login');
  };
}

export default MainCtrl;
