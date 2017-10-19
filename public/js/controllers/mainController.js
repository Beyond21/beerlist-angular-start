app.controller('ctrl1', function($scope, beer_service) {

    $scope.beers = [];

    // It should have an array of beers on it's $scope (so the view can display them)

    // There should be a function for adding a beer (via a form on the view)

    // There should be a function for removing a beer (via a button on the view)
    // When the app is loaded it should fetch all the beers (via the beer factory)


    $scope.addBeer = function() {

            var beer_from_client = {
                name: $scope.name,
                style: $scope.style,
                image_url: $scope.image,
                abv: $scope.abv
            };

            beer_service.addBeer(beer_from_client)



            .then(function(beers_from_service) {

                console.log(beers_from_service);
                $scope.beers.push(beers_from_service);
            })
        }
        //this function accept from the view the id of the beer that we want to remove  
    $scope.removeBeer = function(id) {

        beer_service.removeBeer(id)
            //after the beer object arrived back from the service, its id is checked with the objects' ids
            //that are in the $scope array, if there is a match, the specific beer is being spliced,
            // using the counter,which is the same as the index position 
            .then(function(Beer_arrived_from_service) {
                for (var i = 0; i < $scope.beers.length; i++) {
                    if (Beer_arrived_from_service._id == $scope.beers[i]._id) {
                        $scope.beers.splice(i, 1)
                    }
                }


            })





    }

    beer_service.getBeers()
        .then(function(beers_from_service) {
            $scope.beers = beers_from_service;
        })
        .catch(function(error) {
            console.log(error)
        });






    //$scope.beers.push(beer_from_client);




})