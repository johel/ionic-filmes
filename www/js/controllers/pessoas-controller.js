(function(){

	var PESSOAS_PATH = 'person/popular';

	function PessoasCtrl($scope,$ionicLoading,$ionicPopup,$state, EntityService){
		console.log('cheguei no pessoa controller');
		var entityService = EntityService.InstanceByPath(PESSOAS_PATH);
		$scope.pessoas = entityService;
		$ionicLoading.show();
		entityService.load().finally(function(){
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

		$scope.showPerson = function(person){
			$state.go('app.pessoa', {
				person: person
			});
		}

	}


	function PersonCtrl($scope, $stateParams,$ionicLoading, PersonService){
		console.log('Person Ctrl params', $stateParams);
		// $scope.person = $stateParams.person;
		// $scope.labels = ["Bom", "Regular", "Ruim"];
		// $scope.data= [1,2,3];

		function loadData(){
			$ionicLoading.show();
			var person = $scope.person = $stateParams.person;
			$scope.labels = ["Bom", "Regular", "Ruim"];
			PersonService.getHerMoviesQualityDistribution(person.id).then(function(data){
				$scope.data = data;
			}).finally(function(){
				$ionicLoading.hide();
			});
		}

		loadData();

	}


	var app = angular.module('starter.controllers');
	app.controller('PessoasCtrl', PessoasCtrl);
	app.controller('PersonCtrl', PersonCtrl);


})(angular)

