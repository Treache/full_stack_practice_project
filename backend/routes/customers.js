const express = require("express");
const Customer = require('../models/customer');

const router = express.Router();


router.get('', (req, res, next) => {
  // Gets all movies from databases
  Customer.all_customers(req, (err, result) => {
    if (err) return console.log("Error retrieving movies: " + err);
    res.json(result);
  });
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
  console.log("HEREZZ");

  let newCustomer = req.body;
  console.log(newCustomer);
  Customer.new_customer(req, function(err, result) {
    if (err) return res.json({Error: err})
    console.log("Added");
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
