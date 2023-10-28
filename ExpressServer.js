//express,path
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/LogEvents.js');
const errorHandler = require('./middleware/errorHandler.js');
const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnect.js');
const mongoose = require('mongoose');
//defining port
const PORT = process.env.PORT || 3500;

//conecting to DB
connectDB();


//MIDDLEWARE
//Custom middleware 
app.use(logger);

//to handle url encoded data
app.use(express.urlencoded({extended : false}));

//to handle JSON files
app.use(express.json());

//to handle static files
app.use(express.static(path.join(__dirname,'/public')));

app.use(cookieParser());
//Routes
app.use('/',require(`./Routes/root`));
app.use('/auth',require(`./Routes/auth`));
app.use('/register',require('./Routes/register.js'));
app.use('/refresh',require('./Routes/refresh.js'));
app.use('/logout',require('./Routes/logout.js'));
app.use(verifyJWT);
app.use('/employee',require(`./Routes/api/employee.js`));


app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler);

//this method checks if server is connected to mongoDB and callback function,
//open is the status of DB that determines that it is connected

//we will onlt listen to the server if DB is connected
mongoose.connection.once('open',()=> {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})