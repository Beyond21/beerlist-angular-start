//package and module requirements

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Beer = require("./beerModel")

//conneting 
var app = express();
mongoose.connect('mongodb://localhost/beers')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('node_modules'));


var handler = function(res, next) {
    return function(err, beer) {
        if (err) {
            return next(err);
        }
        console.log(beer)
        res.send(beer);
    }
}

app.get('/beers', function(request, response, next) {

    Beer.find(function(err, beers_from_db) {
        if (err) {
            return next(err);
        }
        response.send(beers_from_db);
    });

});


app.post('/beers', function(req, res, next) {

    //recieve what the client gave us
    var new_beer_from_client = req.body
        //save what the client gave us
    var new_beer_for_db = new Beer(new_beer_from_client);

    new_beer_for_db.save(function(err, beers_from_db) {
        if (err) {
            return next(err);
        }
        res.send(beers_from_db);
        //send a response to the client that we saved it
        // res.send(new_beer_for_db)
    });
})




app.delete("/beers/:beerId", function(req, res, next) {

    var id = req.params.beerId;

    Beer.findByIdAndRemove(id, function(err, removed_beer) {
        if (err) {
            return next(err);
        }
        res.send(removed_beer);
    })

});



//create a post route that returns anything the client sends 
app.post("/brandon/:param1/:param2", function(req, res) {
    //send an object with 2 parameters that the client sends
    var data = { param1: req.params.param1, param2: req.params.param2 };
    res.send(data)
})

app.put("/brandon/:param1/something/:param2", function(req, res) {
    //send an object with 2 parameters that the client sends
    var data = { param1: req.params.param1, param2: req.params.param2, data: req.body };
    res.send(data)
})



// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(8000, function() {
    console.log("yo yo yo, on 8000!!")
});