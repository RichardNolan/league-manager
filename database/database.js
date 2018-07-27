const mongoose = require('mongoose');

const connStrLocal = `mongodb://${process.env.DB_LOCAL_HOST}`
const connStrAdmin = `mongodb://${process.env.DB_ADMIN_USERNAME}:${process.env.DB_ADMIN_PASSWORD}@${process.env.DB_HOST}`
const connStrPublic = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`

let connStr = connStrPublic
console.log("Connecting to " + connStr)

mongoose.connect(connStr)
    .then(connection=>console.log("Database connected"))
    .catch(err=>console.log("err", err));

module.exports = mongoose
