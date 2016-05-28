var app = angular.module('starter.services');
var FAVORITOS = 'FAVORITOS';
app.factory('FavoriteService', ['$window', function($window) {
  var favoritos = JSON.parse($window.localStorage[FAVORITOS] || '{}');
  return {
    addFavorite: function(movie) {
      if(!(movie in favoritos) ){
        favoritos[movie.id] = movie;
        $window.localStorage[FAVORITOS]= JSON.stringify(favoritos);
      }
      
    },
    isFavorite: function(movie){
      return (movie.id in favoritos);
    },
    getFavorite: function(movie) {
      return favoritos[movie.id];
    },
    getFavorites: function() {
      return favoritos;
    },
    get results() {
      var keys = Object.keys(favoritos);
      return keys.map(function(key){
        return favoritos[key];
      });
    },
    removeFavorite:function(movie){
      delete favoritos[movie.id];
      $window.localStorage[FAVORITOS]= JSON.stringify(favoritos);
    },
    count: function(){
      return Object.keys(favoritos).length;
    }
  }
}]);