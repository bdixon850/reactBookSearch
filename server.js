const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")
    .then(() => {
        console.log('Successfully connected to Mongo DB')
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

require('./routes/api-routes')(app);


app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT)
});