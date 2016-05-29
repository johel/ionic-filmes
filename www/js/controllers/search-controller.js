var MOVIE_SEARCH_PATH = "search/movie";

function SearchCtrl($scope,$ionicLoading,$ionicPopup,$state,FavoriteService,$stateParams, SearchService){

	SearchService.initializeSearch(MOVIE_SEARCH_PATH, $stateParams.searchTerm);
	$scope.movies = SearchService;
	$ionicLoading.show();
	SearchService.load().then(function () {
		
	}).finally(function(){
		$ionicLoading.hide();
	})

	$scope.moreDataCanBeLoaded = function(){
		return SearchService.hasMore;
	};

	$scope.refreshItems = function () {
		if(!SearchService.isLoading){
			SearchService.refresh().then(function () {
			
			}).finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.nextPage = function () {
		if(SearchService.hasMore && !SearchService.isLoading){
			SearchService.next().then(function () {
				
			}).finally(function(){
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	};

	$scope.addToFavorites = function(movie){
  	FavoriteService.addFavorite(movie);
  }

  $scope.removeFromFavorites = function(movie){
  	FavoriteService.removeFavorite(movie);
  }

	$scope.showMovie = function(movie){
		$state.go('app.estreia', {
			movie: movie
		});
	}

	$scope.isFavorite = function(movie){
  	return FavoriteService.isFavorite(movie);
  }

}

var app = angular.module('starter.controllers');
app.controller('SearchCtrl', SearchCtrl);