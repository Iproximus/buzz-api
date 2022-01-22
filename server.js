require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
const usersRoute = require('./routes/users')
const homeownersRoute = require('./routes/homeowners')
app.use('/users', usersRoute)
app.use('/homeowners', homeownersRoute)

app.listen(3000, () => console.log('Server Started at 3000'))