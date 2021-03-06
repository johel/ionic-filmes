// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',[
  'ionic',
  'ngCordova',
  'starter.services',
  'starter.controllers',
  'chart.js'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.favoritos', {
    url: '/favoritos',
    views: {
      'menuContent': {
        templateUrl: 'templates/favoritos.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('app.favorito', {
    url: '/favorito',
    params: {movie:null},
    views: {
      'menuContent': {
        templateUrl: 'templates/favorito.html',
        controller: 'FavoriteCtrl'
      }
    }
  })

  .state('app.estreias', {
    url: '/estreias',
    views: {
      'menuContent': {
        templateUrl: 'templates/filmes.html',
        controller: 'EstreiasCtrl'
      }
    }
  })

  .state('app.estreia', {
    url: '/estreia',
    params: {movie:null},
    views: {
      'menuContent': {
        templateUrl: 'templates/filme.html',
        controller: 'MovieCtrl'
      }
    }
  })

  .state('app.pessoas', {
    url: '/pessoas',
    views: {
      'menuContent': {
        templateUrl: 'templates/pessoas.html',
        controller: 'PessoasCtrl'
      }
    }
  })


  .state('app.pessoa', {
    url: '/pessoa',
    params: {person:null},
    views: {
      'menuContent': {
        templateUrl: 'templates/pessoa.html',
        controller: 'PersonCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    params: {searchTerm:null},
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/favoritos');
});
