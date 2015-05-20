'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'ui.bootstrap.pagination',
    'ui.bootstrap.tpls'
  ])
  .run(function($rootScope,$location) {
    $rootScope.$on('$routeChangeStart', function() {
      if($location.path() == '/') {
        localStorage.storage = {};
      } else {
        if(!localStorage.isLogin) {
          $location.path('/');
        }
      }
    });
  })
  .config(function($modalProvider) {
    angular.extend($modalProvider.defaults, {
      animation: 'animated rubberBand'
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardCtrl'
      })
      .when('/subjectStore', {
        templateUrl: 'views/subjectStore.html',
        controller: 'subjectStoreCtrl'
      })
      .when('/addSubject', {
        templateUrl: 'views/addSubject.html',
        controller: 'addSubjectCtrl'
      })
      .when('/generatePaper', {
        templateUrl: 'views/generatePaper.html',
        controller: 'generatePaperCtrl'
      })
      .when('/takeExam', {
        templateUrl: 'views/takeExam.html',
        controller: 'takeExamCtrl'
      })
      .when('/fileManagement', {
        templateUrl: 'views/fileManagement.html',
        controller: 'fileManagementCtrl'
      })
      .when('/queryScore', {
        templateUrl: 'views/queryScore.html',
        controller: 'queryScoreCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
