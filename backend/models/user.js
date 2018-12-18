const mongoose = require('mongoose');

const modelName = "User";
// ***** Build Your Model Schema here *****
var schema = mongoose.Schema;
var movieSchema = new schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: String,
});

module.exports = mongoose.model(modelName, movieSchema);
