(function(){

	var ESTREIAS_PATH = 'movie/upcoming';
	var PATH2 = 'genre/' + '18'+ '/movies'

	function EstreiasCtrl($scope,$ionicLoading,$ionicPopup,$state,FavoriteService, EntityService){
		console.log('cheguei no estreia controller');
		var entityService = EntityService.InstanceByPath(ESTREIAS_PATH);
		$scope.movies = entityService;
		$ionicLoading.show();
		entityService.load().then(function () {
			
		}).finally(function(){
			$ionicLoading.hide();
		})

		$scope.moreDataCanBeLoaded = function(){
			return entityService.hasMore;
		};

		$scope.refreshItems = function () {
			if(!entityService.isLoading){
				entityService.refresh().then(function () {
				
				}).finally(function(){
					$scope.$broadcast('scroll.refreshComplete');
				});
			}
		};

		$scope.nextPage = function () {
			if(entityService.hasMore && !entityService.isLoading){
				entityService.next().then(function () {
					
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


	function MovieCtrl($scope, $stateParams, $cordovaSocialSharing, FavoriteService){
		$scope.movie = $stateParams.movie;

		$scope.shareAnywhere = function() {
				var image = 'http://image.tmdb.org/t/p/w300/' + $scope.movie.poster_path;
        $cordovaSocialSharing.share("Minha mensagem", "Assunto do Email", image, "http://www.programadorobjetivo.co");
    }

		$scope.shareViaType = function(type, message, image, link) {
      $cordovaSocialSharing.canShareVia(type, message, image, link).then(function(result) {
      		switch(type){
      			case 'twitter':
      				$cordovaSocialSharing.shareViaTwitter(message, image, link);
      				break;
      			case 'facebook':
      				$cordovaSocialSharing.shareViaFacebook(message, image, link);
      				break;
      			default:
      				$cordovaSocialSharing.share("Minha mensagem", "Assunto do Email", image, "http://www.programadorobjetivo.co");
      				break;
      		}
      }, function(error) {
          alert("Nao é possivel compartilhar no " + type);
      });
    }

    $scope.addToFavorite = function(movie){
    	FavoriteService.addFavorite(movie);
    }

     $scope.isFavorite = function(movie){
    	return FavoriteService.isFavorite(movie);
    }

	}


	var app = angular.module('starter.controllers');
	app.controller('EstreiasCtrl', EstreiasCtrl);
	app.controller('MovieCtrl', MovieCtrl);


})(angular)

