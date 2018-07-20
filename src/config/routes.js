function secureState($q, $state, $auth, $rootScope) {
  return new $q(resolve => {
    if($auth.isAuthenticated()) return resolve();

    $rootScope.$broadcast('flashMessage', {
      type: 'warning',
      content: 'You need to be logged in to see that.'
    });
    $state.go('login');
  });
}

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/favours/index.html',
      controller: 'FavoursIndexCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: './views/about.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/auth/register.html',
      controller: 'AuthRegisterCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: './views/auth/login.html',
      controller: 'AuthLoginCtrl'
    })
    // .state('favourIndex', {
    //   url: '/favours',
    //   templateUrl: './views/favours/index.html',
    //   controller: 'FavoursIndexCtrl'
    // })
    .state('favourShow', {
      url: '/favours/:id',
      templateUrl: './views/favours/show.html',
      controller: 'FavoursShowCtrl'
    })
    .state('favoursEdit', {
      url: '/favours/:id/edit',
      templateUrl: './views/favours/edit.html',
      controller: 'FavoursEditCtrl',
      resolve: { secureState }
    })
    .state('favoursNew', {
      url: '/favours/new',
      templateUrl: './views/favours/new.html',
      controller: 'FavoursNewCtrl',
      resolve: { secureState }
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: './views/users/index.html',
      controller: 'UsersIndexCtrl'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: './views/users/show.html',
      controller: 'UsersShowCtrl'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: './views/users/edit.html',
      controller: 'UsersEditCtrl',
      resolve: { secureState }
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
