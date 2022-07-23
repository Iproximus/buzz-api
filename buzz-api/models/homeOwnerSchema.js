const mongoose = require('mongoose');
const homeOwnerSchema = new mongoose.Schema({
    // homeowner: {
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    first_name: { type: String },
    last_name: { type: String },
    mail_address: { type: String },
    address: {
        address_line_1: { type: String },
        address_line_2: { type: String },
        city: { type: String, length: 10 },
        district: { type: String, length: 50 },
        pincode: { type: Number, length: 6 },
        country: { type: String, length: 20 },
    },
    phone_number: { type: Number, length: 10, required: false },
    reference_id: { type: String },
    note: { type: String, length: 100, required: false },

    preferences: {
        email_unsubscribed: { type: Boolean }
    },

    creation_source: { type: String },
    version: { type: Number, length: 6 }

    //}
})

module.exports = mongoose.model('homeowners', homeOwnerSchema)