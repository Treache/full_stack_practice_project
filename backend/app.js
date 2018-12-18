const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');

const app = express();

// *********** Include the Api routes ***********
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const customerRoutes = require("./routes/customers");

// *********** Connect to Mongo  ***********
var init = function() {
  user = {
    email: "admin@admin.ca",
    username: "Admin",
    password: "admin1234"
  }
  
}

// *********** Connect to Mongo  ***********
console.log('Attempting to connect to mongoose');

mongoose.connect('mongodb://localhost:27017/host')
  .then(() => {
    console.log('Connected to Mongo database!');
  })
  .catch(err  => {
    console.error('App starting error:', err.stack);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});

// ******** Setup the Api routes ***********
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/customers", customerRoutes);


app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/tickets-admin/index.html'));
});

module.exports = app;
