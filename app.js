//by doing this we have some steps
//first of all we required dotenv module
//this enables us to use environment variables from .env file
//to our procces.env to store some configurations that you dont'
//want to hardcode it in your application and if you hardcode it
//and someone saw your application code it will know it

//if we don't use this module we have two options

//hardcode these stuff PORT | DATABASE

//make these environment variables ourselves
//this is not so good if we moved the file from somewher to another
//using the method .config() on this require
//loads the environment variables from .env file
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mainRoute = require('./server/routes/main');
const adminRoute = require('./server/routes/admin');
const connectDB = require('./server/config/db');
const getLocalIPAddress = require('./server/helpers/getLocalIPAddress')
const app = express();
app.use(express.static('public'));
app.use(expressLayouts);
//to parse the raw data from url
app.use(express.urlencoded({ extended: true }));
//to parse the json data from url
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
connectDB();
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
const port = 5000 || process.env.PORT;

app.use('/', mainRoute);
app.use('/', adminRoute);
app.use((req, res) => {
  res.render('404');
});
const localIP = getLocalIPAddress();
app.listen(port, () => {
  console.log(`App is listening on port ${port} and your ip is: ${localIP}`);
});
