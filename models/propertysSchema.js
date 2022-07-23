const mongoose = require('mongoose');
const propertysSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    uploadimg: {
        type: String,
        required: false
    },
    streetnumber: {
        type: Number,
        required: false
    },
    streetname: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: Array,
        required: false
    },
    city: {
        type: Array,
        required: false
    },
    zipcode: {
        type: Number,
        required: false
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    yearbuilt: {
        type: Number,
        required: false
    },
    area: {
        type: Number,
        required: false
    },
    lotarea: {
        type: Number,
        required: false
    },
    bedrooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    storey: {
        type: Number,
        required: false
    },
    ownership: {
        type: String,
        required: false
    },
    duestatus: {
        type: String,
        required: false
    },
    hometype: {
        type: String,
        required: false
    },
    homevalue: {
        type: Number,
        required: false
    },
    taxassessment:{
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('propertys', propertysSchema)