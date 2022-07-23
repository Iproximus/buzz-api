require('dotenv').config()

var cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.use(cors())

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User & HomeOwner API',
            version: '1.0.0',
            description: 'Users and Home owners API documentation',
            contact: {
                name: 'Buzz',
                email: "buzz-team@web.com",
                url: "web.com"
            },
            servers: [
                {
                    url: "http://localhost:1000",
                    description: "Local server"
                }
            ],
            tags: [
                {
                    name: "Users-API",
                    description: "Everything about your Pets",
                    externalDocs: {
                        description: "Find out more",
                        url: "http://swagger.io"
                    }
                }
            ]
        }
    },
    apis: ["./routes/users.js",  "./routes/homeowners.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Buzz-api DB Connected'))

app.use(express.json())
const usersRoute = require('./routes/users')
const homeownersRoute = require('./routes/homeowners')
const propertysRoute = require('./routes/propertys')
const uploadFileRoute = require('./routes/uploadFiles')

app.use('/users', usersRoute)
app.use('/homeowners', homeownersRoute)
app.use('/propertys', propertysRoute)
app.use('/uploadFiles', uploadFileRoute)


app.listen(3000, () => console.log('Server Started at 3000'))