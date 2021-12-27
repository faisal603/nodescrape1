const mongoose = require('mongoose');

const craigschema =new mongoose.Schema(
    {
        title: String,
        url: String,
        posttime: Date,
        city: String,
        jobdesc: String,
        comp: String,

    }

);

const Moda = mongoose.model("Moda",craigschema)

module.exports = Moda;