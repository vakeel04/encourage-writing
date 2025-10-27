const mongoose = require("mongoose");
require("dotenv").config();
const local_url = process.env.LOCAL_URL;

const connect = mongoose
  .connect(local_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is connect success"))
  .catch((err) => console.log(err, "conection error"));

module.exports = connect;
