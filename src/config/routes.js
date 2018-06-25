function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html'
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
    .state('favourIndex', {
      url: '/favours',
      templateUrl: './views/favours/index.html',
      controller: 'FavoursIndexCtrl'
    })
    .state('favourShow', {
      url: '/favours/:id',
      templateUrl: './views/favours/show.html',
      controller: 'FavoursShowCtrl'
    })
    .state('favoursEdit', {
      url: '/favours/:id/edit',
      templateUrl: './views/favours/edit.html',
      controller: 'FavoursEditCtrl'
    })
    .state('favoursNew', {
      url: '/favours/new',
      templateUrl: './views/favours/new.html',
      controller: 'FavoursNewCtrl'
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
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
