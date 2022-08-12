const express = require('express')
const router = express.Router()
const Properties = require('../models/propertiesSchema')

router.post('/addproperty', async (req, res) => {
    const properties = new Properties({
        uploadimg: req.body.uploadimg,
        streetnumber: req.body.streetnumber,
        streetname: req.body.streetname,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        yearbuilt: req.body.yearbuilt,
        area: req.body.area,
        lotarea: req.body.lotarea,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        storey: req.body.storey,
        ownership: req.body.ownership,
        duestatus: req.body.duestatus,
        hometype: req.body.hometype,
        homevalue: req.body.homevalue,
        taxassessment: req.body.taxassessment
    })
    console.log("-----Add Property api-------");
    try {
        const newProperties = await properties.save()
        res.status(201).json(newProperties)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.patch('/updateproperty/:id', async (req, res) => {
    try {
        console.log("-----Update property api by id-------");
        const id = req.params.id;
        const updates = req.body;
        const option = { new: true };
        const updateproperty = await Properties.findByIdAndUpdate(id, updates, option)
        res.json(updateproperty)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// router.post('/updateproperty/:id') ,function (req, res) {
//     Properties.findById(req.params.id, function (err, data) {
//         if (!data)
//             return next(new Error('Unable To Find Employee With This Id'));
//         else {
//             data.streetnumber = req.body.streetnumber;
//             data.streetname = req.body.streetname;
//             data.country = req.body.country;
//             data.state = req.body.state;
//             data.city = req.body.city;
//             data.zipcode = req.body.zipcode;
//             data.firstname = req.body.firstname;
//             data.lastname = req.body.lastname;
//             data.email = req.body.email;
//             data.phone = req.body.phone;
//             data.yearbuilt = req.body.yearbuilt;
//             data.area = req.body.area;
//             data.lotarea = req.body.lotarea;
//             data.bedrooms = req.body.bedrooms;
//             data.bathrooms = req.body.bathrooms;
//             data.storey = req.body.storey;
//             data.ownership = req.body.ownership;
//             data.hometype = req.body.hometype;
//             data.homevalue = req.body.homevalue;
//             data.taxassessment = req.body.taxassessment;

//             data.save().then(property => {
//                 res.json('Property Updated Successfully');
//             })
//                 .catch(err => {
//                     res.status(400).send("Unable To Update Property");
//                 });
//         }
//     });
// };

router.get('/listAllproperties', async (req, res, next) => {
    try {
        console.log("-----List All Properties api-------");
        const properties = await Properties.find()
        res.json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/getproperty/:id', getUser, async (req, res, next) => {
    try {
        console.log("---------Get single record by id called--------");
        let property = await Properties.findById(req.params.id);
        res.json(property)
        if (property == null) {
            return res.status(404).json({ message: 'Property not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/deleteproperty/:id', getUser, async (req, res) => {
    try {
        console.log("---------Delete user by id called----------");
        await res.property.remove();
        res.json({ message: "Property removed successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let property
    try {
        property = await Properties.findById(req.params.id);
        if (property == null) {
            return res.status(404).json({ message: 'Property not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.property = property
    next()
}

module.exports = router;