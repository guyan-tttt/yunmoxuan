const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: String,
    logo: String,
    link: String,
    bgImg: String,
    desc: String,
    start_time: String,
    end_time: String,
    content: String
})

module.exports = mongoose.model("Project", Schema);