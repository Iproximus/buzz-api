 const express = require('express')
 const router = express.Router()
 const Homeowner = require('../models/homeOwnerSchema')

 router.get('/listAll', async(req, res, next) => {
     try {
         const homeowners = await Homeowner.find()
         res.json(homeowners)
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 })

 router.get('/listOne/:id', getId, (req, res) => {
     res.send(res.homeowner)
 })

 router.post('/addHomeowner', async(req, res) => {
     const homeowners = new Homeowner({
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         mail_address: req.body.mail_address,
         address: {
             address_line_1: req.body.address.address_line_1,
             address_line_2: req.body.address.address_line_2,
             city: req.body.address.city,
             district: req.body.address.district,
             pincode: req.body.address.pincode,
             country: req.body.address.country
         },
         phone_number: req.body.phone_number,
         reference_id: req.body.reference_id,
         note: req.body.note,
         preferences: {
             email_unsubscribed: req.body.preferences.email_unsubscribed
         },
         creation_source: req.body.creation_source,
         version: req.body.version
     })
     try {
         const newHomeowner = await homeowners.save()
         res.status(201).json(newHomeowner)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })

 router.patch('/updateHomeowners/:id', async(req, res) => {
     try {
         const id = req.params.id;
         const updates = req.body;
         const option = { new: true };
         const updateHomeowner = await Homeowner.findByIdAndUpdate(id, updates, option)
         res.json(updateHomeowner)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })

 router.delete('/deleteHomeowner/:id', getId, async(req, res) => {
     try {
         await res.homeowner.remove();
         res.json({ message: "User removed successfully" })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 })


 async function getId(req, res, next) {
     let homeowner
     try {
         homeowner = await Homeowner.findById(req.params.id);
         if (homeowner == null) {
             return res.status(404).json({ message: 'Homeowner not found' })
         }
     } catch (err) {
         return res.status(500).json({ message: err.message })
     }
     res.homeowner = homeowner
     next()
 }
 module.exports = router;