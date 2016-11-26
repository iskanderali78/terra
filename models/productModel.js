/**
 * Created by MASTER on 21.11.2016.
 */
var mongoose = require('../lib/mongooseExt');

var Product = new mongoose.Schema({
    name: String,
    category: String,
    status: String,
    price: Number,
    image: String,
    description: String,
    producer: String,
    size: String,
    weight: Number,
    country: String
});

module.exports = mongoose.model('Product', Product);
