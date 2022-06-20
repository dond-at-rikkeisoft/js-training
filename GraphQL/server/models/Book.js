const mongoose = require("mongoose")
const Schems = mongoose.Schema

const BookSchema = new mongoose.Schema({
    name: {
        type : String
    },
    genre : {
        type : String
    },
    authorId : {
        type : String
    }
})

module.exports = mongoose.model('books', BookSchema)