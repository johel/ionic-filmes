angular.module('starter.services', [])
	.constant('BASE_URL', 'https://api.themoviedb.org/3/')
	.constant('API_KEY', '2971983c49109e8b49b70091a46e6219')
	.factory('EntityService', function MessageFactory($q, $http, BASE_URL, API_KEY){
		
		function Service(path){
			this.page = 1;
			this.isLoading = false;
			this.isSaving = false;
			this.hasMore = true;
			this.results = [];
			this.path = path;
		}

		Service.prototype.reset = function(){
				this.page = 1;
				this.isLoading = false;
				this.isSaving = false;
				this.hasMore = true;
				this.results = [];
		}

		Service.prototype.refresh = function(){
			this.reset();
			return this.load();
		}

		Service.prototype.load = function(){
			var that = this;
			var url = BASE_URL +  that.path  + '?page=' + that.page + '&api_key=' + API_KEY;
			console.log('url', url);
			console.log('chegou no service');
			that.isLoading = true;
			var d = $q.defer();
			var request = $http.get(url);

			request.then(function(response){
				console.log('resultado da solicitacao');
				console.log(response.data);
				var results = response.data.results;

				angular.forEach(results,function(item, key){
					that.results.push(item);
				});

				if (results.length == 0) {
					that.hasMore = false;
				}

				d.resolve();

			}, function(error){
				console.log('error');
				console.log(error);
				d.reject(error);
			}).finally(function(){
				that.isLoading = false;
			});

			return d.promise;
		}

		Service.prototype.next = function(){
			console.log('next');
			this.page += 1;
			return this.load();
		}

		Service.prototype.getEntity= function(){
			for (var i = 0; i < this.results.length; i++) {
				var entity = this.results[i];
				if(entity.id== entityId){
					return entity;
				}
			};
		}

		var instancedService = {
			InstanceByPath:function(path){
				return new Service(path);
			}
		}

		return instancedService;
	});
