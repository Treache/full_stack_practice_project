const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const movieSchema = mongoose.Schema({
    title: String,
    rinningDateTime: Date,
    genre: String,
    rating: Number,
    director: String,
    status: Boolean,
})

module.exports = mongoose.model('Movie', studentSchema);
