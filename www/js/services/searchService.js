angular.module('starter.services')
	.constant('BASE_URL', 'https://api.themoviedb.org/3/')
	.constant('API_KEY', '2971983c49109e8b49b70091a46e6219')
	.factory('SearchService', function SearchFactory($q, $http, BASE_URL, API_KEY){
		
		function Service(){
			this.page = 1;
			this.isLoading = false;
			this.isSaving = false;
			this.hasMore = true;
			this.results = [];
			this.path = "search/movie"
			this.searchTerm = "wolf";
		}

		Service.prototype.initializeSearch = function(path, searchTerm){
			this.page = 1;
			this.isLoading = false;
			this.isSaving = false;
			this.hasMore = true;
			this.results = [];
			this.path = path;
			this.searchTerm = searchTerm;
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
			var url = BASE_URL + that.path + '?page=' + that.page + '&api_key=' + API_KEY + '&query=' + encodeURIComponent(that.searchTerm);
			that.isLoading = true;
			var d = $q.defer();
			var request = $http.get(url);

			request.then(function(response){
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
			this.page += 1;
			return this.load();
		}


		var instancedService = new Service();

		return instancedService;
	});
