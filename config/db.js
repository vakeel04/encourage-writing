const mongoose = require("mongoose");
require("dotenv").config();
const LIVE_URL = process.env.LOCAL_URL;

const connect = mongoose
  .connect(LIVE_URL, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is connect success"))
  .catch((err) => console.log(err, "conection error"));

module.exports = connect;
