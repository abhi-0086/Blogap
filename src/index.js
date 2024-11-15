require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

//create express app
const app = express();

//connect DB
connectDB();

//middleware to parse JSON
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//placeholder route
app.get('/', (req, res) => {
    res.send("Welcome to Blog API find the application documentation --");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is up and running on http://localhost:${process.env.PORT || 3000}`);
});