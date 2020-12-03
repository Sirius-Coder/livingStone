const mongoose = require('mongoose');

//Setting up the MongoDb server

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        console.log(`The connection to database ${conn.connection.host} has been succesfully established`)
    } catch (err) {
        console.error(err)
    }

}

module.exports = connectDB;