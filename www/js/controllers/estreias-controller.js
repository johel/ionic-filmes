(function(){

	var ESTREIAS_PATH = 'movie/upcoming';
	var PATH2 = 'genre/' + '18'+ '/movies'

	function EstreiasCtrl($scope,$ionicLoading,$ionicPopup, EntityService){
		console.log('cheguei no estreia controller');
		var entityService = EntityService.InstanceByPath(ESTREIAS_PATH);
		$scope.estreias = entityService;
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

	}

	var app = angular.module('starter.controllers');
	app.controller('EstreiasCtrl', EstreiasCtrl);


})(angular)

