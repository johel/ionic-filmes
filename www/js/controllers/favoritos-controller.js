function FavoritesCtrl($scope, $state,$location,$ionicHistory, FavoriteService){
	$scope.favorites = FavoriteService;
	$scope.search = {};
	$scope.showMovie = function(movie){
		$state.go('app.favorito', {
			movie: movie
		});
	}

	$scope.clickHere = function(){		
		$ionicHistory.nextViewOptions({
		  disableAnimate: true,
		  disableBack: true
		});

		$location.path('/app/estreias');
	}

	$scope.search = function(){
		var searchTerm = $scope.search.searchTerm;
		$scope.search.searchTerm = "";
		$state.go('app.search', {
			searchTerm: searchTerm
		});
	}

}

function FavoriteCtrl($scope, $stateParams,$state,$location, FavoriteService){
	$scope.movie = $stateParams.movie;

	$scope.removeFromFavorites = function(movie){
		FavoriteService.removeFavorite(movie);
		$location.path('/');
	}

}


var app = angular.module('starter.controllers');
app.controller('FavoritesCtrl', FavoritesCtrl);
app.controller('FavoriteCtrl', FavoriteCtrl);