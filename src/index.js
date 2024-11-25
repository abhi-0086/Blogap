require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

//Swagger options
const swaggerOptions = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:"Blog application",
            version: "1.0.0",
            description:'Blog or Content managemnent system'
        }
    },
    apis:['./src/routes/*.js']
}

//create express app
const app = express();

//connect DB
connectDB();

//middleware to parse JSON
app.use(express.json());

//initialize swagger js doc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

//routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//placeholder route
app.get('/', (req, res) => {
    res.send("Welcome to Blog API find the application documentation at /api-docs");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is up and running on http://localhost:${process.env.PORT || 3000}`);
});