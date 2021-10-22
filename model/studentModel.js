const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    img: {
        type: String
    }
})

const StudentModel = new mongoose.model('registration', StudentSchema)

module.exports = StudentModel