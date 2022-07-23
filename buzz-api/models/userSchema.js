const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mailid: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phnumber: {
        type: Number,
        length: 10,
        required: false
    }
})

module.exports = mongoose.model('users', userSchema)