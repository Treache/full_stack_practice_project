const mongoose = require('mongoose');


const modelName = "Movie";
// ***** Build Your Model Schema here *****
var schema = mongoose.Schema;
var movieSchema = new schema({
    title: { type: String, required: true },
    runningTime: { type: Number, required: true },
    genre: String,
    rating: { type: Number, min: 0, max: 5 },
    director: { type: String, required: true },
    status: Boolean
});
// const movieSchema = mongoose.Schema({
//     title: String,
//     rinningDateTime: Date,
//     genre: String,
//     rating: Number,
//     director: String,
//     status: Boolean,
// })

movieSchema.statics.new_movie = function (req, callback) {
    let newMovie = req.body;
    if(!newMovie) return callback("Empty movie object");
    let query = {}
    if(newMovie['_id'])
        query["_id"] = newMovie["_id"];
    mongoose.model(modelName).findOneAndUpdate(query, newMovie, {upsert: true, new: true}, function (err, movieDocument) {
        if(err) return callback(err);
        callback(null, movieDocument);
    });
}

module.exports = mongoose.model(modelName, movieSchema);
