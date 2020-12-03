const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
var connectDB = require('./Config/db');
const PORT = process.env.PORT || 5000
const routes = require('./Router/router')
    //Configure the Environment File 
dotenv.config({ path: './Config/config.env' });

//Loading up the Static files 
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Firing up our database 
connectDB();

//Using our Routes 
app.use('/', routes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//Listening to our PORT
app.listen(PORT, () => {
    console.log('The Backend port has been successfully connected');
})