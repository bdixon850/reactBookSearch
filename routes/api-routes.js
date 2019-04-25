const axios = require('axios');
const path = require('path');
const db = require('../models');
require('dotenv').config();

module.exports = function(app) {
    app.get('/api/books', (req, res) => {
        db.Book.find()
            .then((booksData) => {
                res.json(booksData)
            })
            .catch((err) => {
                res.json({error: err})
            })
    });

    app.post('/api/books', (req, res) => {
        db.Book.create(req.body)
            .then((response) => {
                res.json({successful: response})
            })
            .catch((err) => {
                res.json({error: err})
            })
    });

    app.post('/search', (req, res) => {
        let bookTitle = req.body.title.replace(/\s/g, "+");
        let API_KEY = 'AIzaSyAhK3UR8dEdLeIlGpgYybEFlLCE2If32Mo'
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}$key=${API_KEY}`)
            .then((response) => {
                res.json(response.data.items)
            })
            .catch((err) => {
                res.json({error: err})
            })
    });

    app.delete('/api/books/:id', (req, res) => {
        db.Book.findByIdAndDelete(req.params.id)
            .then((response) => {
                res.json({successful: response})
            })
            .catch((err) => {
                res.json({error: err})
            })
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    });
}