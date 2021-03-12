const mongoose = require("mongoose");
const config = require("./config");
const { mongoPath } = require("../config/config.js")

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose;
}