import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'bulma';
import './scss/main.scss';
import 'filepicker-js';
import 'angular-filepicker/dist/angular_filepicker';
import 'angular-messages';

import Router from './config/routes';
import Auth from './config/satellizer';
import Upload from './config/filepicker';

import MainCtrl from './controllers/main';
import FavoursIndexCtrl from './controllers/favours/index';
import FavoursShowCtrl from './controllers/favours/show';
import FavoursNewCtrl from './controllers/favours/new';
import FavoursEditCtrl from './controllers/favours/edit';
import AuthRegisterCtrl from './controllers/auth/register';
import AuthLoginCtrl from './controllers/auth/login';
import UsersIndexCtrl from './controllers/users/index';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';

import filePicker from './directives/filepicker';
import googleMap from './directives/googleMaps';
import googleAutocomplete from './directives/googleAutocomplete';
import infoCard from './directives/infoCard';

angular.module('favourAPI', ['ui.router', 'satellizer', 'angular-filepicker', 'ngMessages'])
  .config(Router)
  .config(Auth)
  .config(Upload)

  .controller('MainCtrl', MainCtrl)
  .controller('FavoursIndexCtrl', FavoursIndexCtrl)
  .controller('FavoursShowCtrl', FavoursShowCtrl)
  .controller('FavoursNewCtrl', FavoursNewCtrl)
  .controller('FavoursEditCtrl', FavoursEditCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)

  .directive('filePicker', filePicker)
  .directive('googleMap', googleMap)
  .directive('googleAutocomplete', googleAutocomplete)
  .directive('infoCard', infoCard);
