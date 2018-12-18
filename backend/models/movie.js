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
movieSchema.statics.all_movies = function (req, callback) {
    // Retrieves all movies
    let findQuery = {} // Find query
    if(req && req.query && req.query.dfilter != undefined && req.query.dfilter != 'undefined')
        // Add dfilter as a filter for title to the find query if it is not undefined
        findQuery['title'] = { $regex: new RegExp(req.query.dfilter, "i") }
    
    if(req && req.query && req.query.status != undefined && req.query.status != 'undefined')
        findQuery['status'] = req.query.status;
    mongoose.model(modelName).find(findQuery, (err, result)=>{
        // find movies
        if (err) return callback(err); // Handle any error
        console.log("Movies retrieved successfully.");
        callback(null, result);
    })
}
movieSchema.statics.new_movie = function (req, callback) {
    // Adds new movie to database
    let newMovie = req.body; // Reading movie document
    if (!newMovie) return callback("Empty movie object"); // If it is an empty object
    mongoose.model(modelName).create(newMovie, function (err, movieDocument) {
        // Create new database record (Document)
        if (err) return callback(err); // Handle any error
        mongoose.model(modelName).all_movies(null, (err, result) => {
            // Retrieve ALL MOVIES and send them back to the client
            callback(null, result);
        });
    });
}
movieSchema.statics.get_movie = function (req, callback) {
    mongoose.model(modelName).find({"_id" : req.params.id}, (err, result) => {
        callback(err, result);
    });
}
movieSchema.statics.update = function(req, callback) {
    let query = {"_id" : req.body._id};
    console.log(query)
    mongoose.model(modelName).findOneAndUpdate(query, req.body, (err, result) => {
        console.log(result);
        callback(err, result);
    })
}
movieSchema.statics.delete_movie = function (req, callback) {
    let query = {"_id" : req.params.id};
    mongoose.model(modelName).findOneAndDelete(query, (err, result) => {
        return callback(err, result);
    })
}
movieSchema.statics.reserve = function (req, callback) {
    let query = {"_id" : req.params.id};
    mongoose.model(modelName).findOneAndUpdate(query, {'$set' : {'status' : false}}, (err, result) => { callback(err, result) })
}

module.exports = mongoose.model(modelName, movieSchema);
