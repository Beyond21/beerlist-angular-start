var mongoose = require('mongoose');

var mongooseSchema = mongoose.Schema;

var beerSchema = new mongooseSchema({
    name: { type: String },
    style: { type: String },
    image_url: { type: String },
    abv: { type: Number }

});

var Beer = mongoose.model("Beer", beerSchema);

module.exports = Beer;