const travelModel = require('../Models/travelModel')
module.exports.createPlan = (req, res, next) => {
    const duration = new Date(req.body.endDate) - new Date(req.body.startDate)
    var budget = 0;
    const trip = [];
    var accomodation = [];
    var places = [];
    travelModel.find({}, null, { sort: { budget: 1 } }, (err, docs) => {
        if (err)
            throw err
        for (let i = 0; i < docs.length && docs[i].budget + budget <= req.body.budget; i++) {

            docs[i].accomodation.forEach(para => {
                para.typePref.forEach((element, index) => {
                    if (element === req.body.purpose) {
                        accomodation.push({ name: para.name, index })
                    }
                });
            })
            accomodation.sort((a, b) => a.index - b.index)
            docs[i].places.forEach(para => {
                para.typePref.forEach((element, index) => {
                    if (element === req.body.purpose) {
                        places.push({ name: para.name, index })
                    }
                });
            })
            places.sort((a, b) => a.index - b.index)
            budget += docs[i].budget;
            trip.push({ accomodation: accomodation[0].name, places: places[0].name, location: docs[i].location, distance: docs[i].distance })
            accomodation = [];
            places = [];
        }
        res.json({
            duration: duration / (1000 * 3600 * 24),
            trip,
            budget
        })
    })
}