const express = require("express");
const Movie = require('../models/movie');

const router = express.Router();


router.get('', (req, res, next) => {
  // Gets all movies from database
  Movie.all_movies(req, (err, result) => {
    if (err) return console.log("Error retrieving movies: " + err);
    res.json(result);
  });
});

router.get('/:id', (req, res, next) => {
  Movie.get_movie(req, function(err, result) {
    if (err) return res.json({Error: err})
    console.log("Movie retrieved");
    res.json(result);
  })
  console.log('GET: Movie by id:' + req.params.id);

  // Implement Mongoose query to find Student by Id return list of students and return

})

router.put('/:id', (req, res, next) => {

  console.log('UPDATE: Movie by id: ' + req.params.id);

  // Implement Mongoose update Student by ID

})

router.post('', (req, res, next) => {
  let newTest = req.body;
  console.log(newTest);
  Movie.new_movie(req, function(err, result) {
    if (err) return res.json({Error: err})
    console.log("Added");
    res.json(result);
  })
  // res.json(newTest);
  
})

router.post('/update', (req, res, next) => {
  Movie.update(req, function(err, result) {
    if(err)return res.json({error: err});
    console.log('Movie Updated');
    res.json(result);

  })


  // Implement Mongoose update Student by ID

})
router.get('/reserve/:id', (req, res, next) => {
  Movie.reserve(req, function(err, result) {
    if(err) return res.json({'error': err})
    console.log(result);
    res.json(result);
  })
}) 
router.delete('/:id', (req, res, next) => {
  console.log("here")
  Movie.delete_movie(req, function (err, result) {
    if(err) return res.json({'error': err})
    console.log("Movie Deleted");
    res.json(result);
  })

  // Implement Mongoose delete one Student by ID

});

module.exports = router;
