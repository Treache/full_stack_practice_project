const mongoose = require('mongoose');


const modelName = "Customer";
// ***** Build Your Model Schema here *****
var schema = mongoose.Schema;
var customerSchema = new schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: String,
    city: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: Boolean
});
customerSchema.statics.all_customers = function (req, callback) {
    // Retrieves all movies
    console.log("HEREZ");
    let findQuery = {} // Find query
    console.log(req.query);
    if(req.query.dfilter != undefined && req.query.dfilter != 'undefined')
        // Add dfilter as a filter for name to the find query if it is not undefined
        findQuery['$or'] = [{ "first_name":  { $regex: new RegExp(req.query.dfilter, "i") }},
        { "last_name":  { $regex: new RegExp(req.query.dfilter, "i") }}]
    if(req && req.query && req.query.status != undefined && req.query.status != 'undefined')
        findQuery['status'] = req.query.status;
   
    console.log(findQuery);
    mongoose.model(modelName).find(findQuery, (err, result)=>{
        // find movies
        if (err) return callback(err); // Handle any error
        console.log("Customers retrieved successfully.");
        console.log(result);
        callback(null, result);
    })
}
customerSchema.statics.new_customer = function (req, callback) {
    // Adds new movie to database
    let newMovie = req.body; // Reading movie document
    if (!newMovie) return callback("Empty movie object"); // If it is an empty object
    mongoose.model(modelName).create(newMovie, function (err, movieDocument) {
        // Create new database record (Document)
        if (err) return callback(err); // Handle any error
        mongoose.model(modelName).all_customers(req, (err, result) => {
            // Retrieve ALL MOVIES and send them back to the client
            callback(err, result);
        });
    });
}

module.exports = mongoose.model(modelName, customerSchema);
