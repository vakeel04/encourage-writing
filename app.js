const express = require("express")
const app = express()
const connect = require("./config/db")
const Router = require("./routes/Router")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const indexRouter = require("./routes/webRouter/indexRouter")

//Env config
require('dotenv').config()
const port = process.env.PORT

//database
connect

//Applycation Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({})); //Set Cors Credentials Before Live 
app.use(cookieParser());

// Template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Router
app.use("/api",Router)
app.use(indexRouter)

//Dynamic Files Setup
app.use('/files', express.static(path.join(__dirname, 'files')));
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

app.listen(port,()=>{
    console.log(`Server Run Port: ${port}`)
    console.log(`Web Url :->) http://localhost:${port}`)
    // console.log(`Dashboard Url :->) http://localhost:${port}/Oauth/v1/admin/home`)
})