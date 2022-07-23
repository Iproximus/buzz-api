const express = require('express')
const router = express.Router()
const Homeowner = require('../models/homeOwnerSchema')

/**
* @swagger
*  components:
*      schema:
*          AddHomeowner:
*              type: object
*              properties:
*                  first_name:
*                      type: string
*                      description: Enter the first_name
*                  last_name:
*                      type: string
*                      description: Enter the last_name
*                  mail_address:
*                      type: string
*                      description: Enter the mail_address
*                  phone_number:
*                      type: integer
*                      description: Enter the phone_number
*                  reference_id:
*                      type: string
*                      description: Enter the reference_id
*                  note:
*                      type: string
*                      description: Enter the note
*                  creation_source:
*                      type: string
*                      description: Enter the creation_source
*                  address:
*                      type: object
*                      properties:
*                          address_line_1:
*                              type: string
*                              description: Enter the address_line_1
*                          address_line_2:
*                              type: string
*                              description: Enter the address_line_2
*                          city:
*                              type: string
*                              description: Enter the city
*                          district:
*                              type: string
*                              description: Enter the district
*                          pincode:
*                              type: integer
*                              description: Enter the pincode
*                          country:
*                              type: string
*                              description: Enter the country
*                  preferences:
*                      type: object
*                      properties:
*                          email_unsubscribed:
*                              type: boolean
*                              description: Enter the email_unsubscribtion
*          Token:
*              type: object
*              properties:
*                  token:
*                      type: string
*                      description: Give the token
*/


/**
* @swagger
* /homeowners/listAll:
*  get:
*     tags:
*     - 'Homeowner-API'
*     summary: Get all homeowners list
*     description: To displaying all stored homeowners datas
*     responses:
*       200:
*          description: Succesfully
*/

router.get('/listAll', async (req, res, next) => {
    try {
        console.log("-----List all homeowners api-------");
        const homeowners = await Homeowner.find()
        res.json(homeowners)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/**
  * @swagger
  * /homeowners/listOne/{id}:
  *  get:
  *     tags:
  *     - 'Homeowner-API'
  *     summary: Get single homeowner
  *     description: Get single homeowner by ID
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

router.get('/listOne/:id', getId, (req, res) => {
    try {
        console.log("-----Get single homeowner data api-------");
        res.send(res.homeowner)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


/**
* @swagger
* /homeowners/addHomeowner:
*  post:
*     tags:
*     - "Homeowner-API"
*     summary: Create new homwowner
*     description: Adding new homwowner
*     requestBody:
*         required: ture
*         content:
*             application/json:
*                schema:
*                   $ref: '#components/schema/AddHomeowner'
*     responses:
*       200:
*          description: User Created
*       500:
*          description: Failed to create user
* 
*/

router.post('/addHomeowner', async (req, res) => {
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
        console.log("-----Add homeowner api-------");

        const newHomeowner = await homeowners.save()
        res.status(201).json(newHomeowner)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


/**
 * @swagger
 * /homeowners/updateHomeowners/{id}:
 *  patch:
 *     tags:
 *     - "Homeowner-API"
 *     summary: Update homeowner
 *     description: Updating single homeowner
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
 *                   $ref: '#components/schema/AddHomeowner'
 *     responses:
 *       200:
 *          description: User updated successfully
 *          content:
 *             application/json:
 *                 schema:
 *                     type: array
 *                     items:
 *                         $ref: '#components/schema/AddHomeowner'
 */

router.patch('/updateHomeowners/:id', async (req, res) => {
    try {
        console.log("-----Update homeowner by id api-------");
        const id = req.params.id;
        const updates = req.body;
        const option = { new: true };
        const updateHomeowner = await Homeowner.findByIdAndUpdate(id, updates, option)
        res.json(updateHomeowner)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


/**
* @swagger
* /homeowners/deleteHomeowner/{id}:
*  delete:
*     tags:
*     - 'Homeowner-API'
*     summary: Delete homeowner from the db
*     description: Going to delete single homeowner from the db
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: give an exact id from db
*         schema:
*             type: string
*     responses:
*       200:
*          description: Deleted succesfully
*/

router.delete('/deleteHomeowner/:id', getId, async (req, res) => {
    try {
        console.log("-----Delete homeowner by id api-------");
        await res.homeowner.remove();
        res.json({ message: "User removed successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getId(req, res, next) {
    let homeowner
    try {
        console.log("-----Get homeowner ID method called-------");
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