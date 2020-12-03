const mongoose = require('mongoose');

//Defining our Schema
var travelSchema = new mongoose.Schema({
    location: {
        type: String,
    },
    distance: {
        type: Number
    },
    accomodation: [],
    places: [],
    budget: {
        type: Number
    }
})

var travelModel = mongoose.model('travelPlan', travelSchema);

module.exports = travelModel;