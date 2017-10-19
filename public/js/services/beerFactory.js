app.factory('beer_service', function($http) {

    var beer_service = {};


    // var beers = [];


    // There should be a way to add a beer to the DB via our server
    //send To the server
    beer_service.addBeer = function(beer_from_ctrl) {
            return $http.post('/beers', beer_from_ctrl)

            //gets from the server:
            .then(function(response) {
                return response.data
            });
        }
        // There should be a way to remove a beer from the DB via our server
    beer_service.removeBeer = function(id) {
        return $http.delete("/beers/" + id).then(function(response) {
            console.log(response.data);
            return response.data


        })


    }

    // There should be a way to get the beers from the DB via our server
    beer_service.getBeers = function() {
        return $http.get('/beers')
            .then(function(response) {
                return angular.copy(response.data);
            });
    };

    return beer_service;

})