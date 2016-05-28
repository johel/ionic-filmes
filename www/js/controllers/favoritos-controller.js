function favoritesCtrl($scope, FavoriteService){
	$scope.favorites = FavoriteService;
	$scope.showMovie = function(movie){
		return FavoriteService.getFavorite(movie);
	}
}



var app = angular.module('starter.controllers');
app.controller('FavoritesCtrl', favoritesCtrl);