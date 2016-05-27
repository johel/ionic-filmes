angular.module('starter.services')
	.constant('BASE_URL', 'https://api.themoviedb.org/3/')
	.constant('API_KEY', '2971983c49109e8b49b70091a46e6219')
	.factory('PersonService', function PersonFactory($q, $http, BASE_URL, API_KEY){
		
		var self = {
			movies:[],
			movieQualityDistribution:{},
			getHerMovies: function(personId){
				var d = $q.defer();
				var personCreditsUrl = BASE_URL + 'person/' + personId + '/movie_credits?api_key=' + API_KEY;
				var creditsRequest = $http({method: 'GET', url: personCreditsUrl})
				// in order to always load movies from ground zero each time a new person is specified
				self.movies = [];

				creditsRequest.then(function(response){
					var movies = response.data.cast.slice(0,15);
					movies.forEach(function(movie){
						self.movies.push(movie);
					})
					d.resolve(self.movies)
				})

				return d.promise;
			},
			getHerMoviesDetailed: function(personId){
					var d = $q.defer();
					var results;
					self.getHerMovies(personId).then(function(movies){
						var promises = movies.map(function(movie){
							var moviesUrl = BASE_URL + 'movie/' + movie.id + '?api_key=' + API_KEY;
							var movieRequest = $http({method: 'GET', url: moviesUrl})
							return movieRequest;
						});

						$q.all(promises).then(function(responses){
							results = responses.map(function(response){return response.data;})
							d.resolve(results);
						});

					})

					return d.promise;
			},
			getHerMoviesQualityDistribution:function(personId){
				var d = $q.defer();
				if(personId in self.movieQualityDistribution){
					d.resolve(self.movieQualityDistribution[personId])
				}else{
					self.getHerMoviesDetailed(personId).then(function(movies){
						var lowCount, mediumCount, highCount;
						lowCount = movies.filter(function(movie){return movie.vote_average < 5.5;}).length;
						mediumCount = movies.filter(function(movie){return movie.vote_average >= 5.5 && movie.vote_average < 7;}).length;
						highCount = movies.filter(function(movie){return movie.vote_average >= 7;}).length;
						self.movieQualityDistribution[personId] = [highCount, mediumCount, lowCount];
						d.resolve(self.movieQualityDistribution[personId]);
					});
				}

				return d.promise; 
			}

		}

		return self;
	})