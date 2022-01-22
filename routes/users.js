 const express = require('express')
 const router = express.Router()
 const User = require('../models/userSchema')


 router.get('/listAll', async(req, res, next) => {
     try {
         const users = await User.find()
         res.json(users)
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 })

 router.get('/listOne/:id', getUser, (req, res) => {
     res.send(res.user)
 })

 router.post('/addUser', async(req, res) => {
     const users = new User({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         role: req.body.role,
         mailid: req.body.mailid,
         phnumber: req.body.phnumber
     })
     try {
         const newUser = await users.save()
         res.status(201).json(newUser)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })

 router.patch('/updateUser/:id', getUser, async(req, res) => {
     if (req.body.firstname != null) {
         res.user.firstname = req.body.firstname
     }
     if (req.body.lastname != null) {
         res.user.lastname = req.body.lastname
     }
     if (req.body.role != null) {
         res.user.role = req.body.role
     }
     if (req.body.mailid != null) {
         res.user.mailid = req.body.mailid
     }
     if (req.body.phnumber != null) {
         res.user.phnumber = req.body.phnumber
     }
     try {
         const updateUser = await res.user.save()
         res.json(updateUser)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })

 router.delete('/deleteUser/:id', getUser, async(req, res) => {
     try {
         await res.user.remove();
         res.json({ message: "User removed successfully" })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 })

 async function getUser(req, res, next) {
     let user
     try {
         user = await User.findById(req.params.id);
         if (user == null) {
             return res.status(404).json({ message: 'User not found' })
         }
     } catch (err) {
         return res.status(500).json({ message: err.message })
     }
     res.user = user
     next()
 }

 module.exports = router;