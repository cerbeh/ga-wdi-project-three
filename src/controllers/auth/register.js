function AuthRegisterCtrl($scope, $auth, $state) {
  $scope.data = {};

  $scope.handleSubmit = function() {
    console.log('heya');
    if(this.form.$invalid) return false;
    console.log('heya2');

    $auth.signup($scope.data)
      .then(() => $state.go('login'));
  };
}

export default AuthRegisterCtrl;
