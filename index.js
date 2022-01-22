const express = require("express")
const bodyParser = require('body-parser')
require("dotenv").config()
const app = express()
const mongoose = require('mongoose')
const { schema } = mongoose

const destinationsSchema = new Schema({
    city: { type: String},
    country: {type: String},
    continent: {type: String},
    primary_language: {type: String},
    timezone: {type: String},
    currency: {type: String},
    tickets_available: {type: Number},
})
const Destinations = mongoose.model('destinations', destinationsSchema)

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/destinations", require("./controllers/destinations"))

app.get("*", (req, res) => {
    res.send("Page Not Found")
})

app.listen(8000, () => {
    console.log("listening on port", 8000)
})