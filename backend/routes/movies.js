const express = require("express");
const Movie = require('../models/movie');

const router = express.Router();


router.get('', (req, res, next) => {

  console.log('GET: Movie lists');
  Movie.find({}, function(err, result) {
    if (err) return err;
    res.json(result);
  });
    // movieModel.find()
  // Add Mongoose query to find all return list of students and return
  // res.json({"res":"mes"})

});

router.get('/:id', (req, res, next) => {

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
    res.json(result);
  })
  // res.json(newTest);
  
})

router.post('/:id', (req, res, next) => {

  console.log('UPDATE: Movie by id: ' + req.params.id);

  // Implement Mongoose update Student by ID

})

router.delete('/:id', (req, res, next) => {

  console.log('UPDATE: Movie by id: ' + req.params.id);

  // Implement Mongoose delete one Student by ID

});

module.exports = router;
