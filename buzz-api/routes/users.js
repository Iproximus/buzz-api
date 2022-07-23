 const express = require('express')
 const router = express.Router()
 const User = require('../models/userSchema')

 /**
 * @swagger
 *  components:
 *      schema:
 *          User:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Enter the registred Emailid
 *                      example: 'bbbb@gmail.com'
 *                  password:
 *                      type: string
 *                      description: Enter the password 
 *                      example: 'Pass@word123'
 *          AddUser:
 *              type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                      description: Enter the Firstname
 *                  lastname:
 *                      type: string
 *                      description: Enter the Lastname
 *                  role:
 *                      type: string
 *                      description: Enter the Role type
 *                  mailid:
 *                      type: string
 *                      description: Enter the valied Emailid
 *                  phnumber:
 *                      type: integer
 *                      description: Enter the Phone number
 *          Token:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                      description: Give the token
 */


 /**
  * @swagger
  * /users/listAll:
  *  get:
  *     tags:
  *     - 'User-API'
  *     summary: Get all user list
  *     description: To displaying all stored user datas
  *     responses:
  *       200:
  *          description: Succesfully
  */

 router.get('/listAll', async(req, res, next) => {
     try {
         console.log("-----List all users api-------");
         const users = await User.find()
         res.json(users)
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 })


 /**
  * @swagger
  * /users/listOne/{id}:
  *  get:
  *     tags:
  *     - 'User-API'
  *     summary: Get single user
  *     description: Get single user by ID
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: give an exact id from db
  *         schema:
  *             type: string
  *     responses:
  *       200:
  *          description: Data fetched from DB succesfully
  *          content:
  *             application/json:
  *                 schema:
  *                     type: array
  *                     items:
  *                         $ref: '#components/schema/AddUser'
  */

 router.get('/listOne/:id', getUser, (req, res) => {
     try{
        console.log("-----Get single user data api-------");
         res.send(res.user)
     }catch (err) {
        res.status(500).json({ message: err.message })
    }
 })


  /**
  * @swagger
  * /users/addUser:
  *  post:
  *     tags:
  *     - "User-API"
  *     summary: Create new user
  *     description: Adding new users
  *     requestBody:
  *         required: ture
  *         content:
  *             application/json:
  *                schema:
  *                   $ref: '#components/schema/AddUser'
  *     responses:
  *       200:
  *          description: User Created
  *       500:
  *          description: Failed to create user
  * 
  */

 router.post('/addUser', async(req, res) => {
     const users = new User({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         role: req.body.role,
         mailid: req.body.mailid,
         phnumber: req.body.phnumber
     })
     console.log("-----Add user api-------");
     try {
         const newUser = await users.save()
         res.status(201).json(newUser)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })


   /**
  * @swagger
  * /users/updateUser/{id}:
  *  patch:
  *     tags:
  *     - "User-API"
  *     summary: Update user
  *     description: Updating single user
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: give an exact id from db
  *         schema:
  *             type: string
  *     requestBody:
  *         required: ture
  *         content:
  *             application/json:
  *                schema:
  *                   $ref: '#components/schema/AddUser'
  *     responses:
  *       200:
  *          description: User updated successfully
  *          content:
  *             application/json:
  *                 schema:
  *                     type: array
  *                     items:
  *                         $ref: '#components/schema/AddUser'
  */

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
     console.log("-----Update user by id api-------");
     try {
         const updateUser = await res.user.save()
         res.json(updateUser)
     } catch (err) {
         res.status(400).json({ message: err.message })
     }
 })

 /**
  * @swagger
  * /users/deleteUser/{id}:
  *  delete:
  *     tags:
  *     - 'User-API'
  *     summary: Delete user from the db
  *     description: Going to delete single user from the db
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: give an exact id from db
  *         schema:
  *             type: string
  *     responses:
  *       200:
  *          description: Data fetched from DB succesfully
  */

 router.delete('/deleteUser/:id', getUser, async(req, res) => {
     try {
        console.log("-----Delete user by id api-------");
         await res.user.remove();
         res.json({ message: "User removed successfully" })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 })

 async function getUser(req, res, next) {
     let user
     try {
        console.log("-----Get user method called-------");
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