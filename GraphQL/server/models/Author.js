const mongoose = require("mongoose")
const Schems = mongoose.Schema

const AuthorSchema = new mongoose.Schema({
    name: {
        type : String
    },
    age : {
        type : Number
    }
})

module.exports = mongoose.model('authors', AuthorSchema)