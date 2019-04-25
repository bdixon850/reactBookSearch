const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    title: String,
    authors: [String],
    description: String,
    img: {
        type: {String}
    },
    link: {
        type: String
    }
    // title: {
    //     type: String,
    //     // required: true
    // },
    // authors: {
    //     type: String
    // },
    // description: {
    //     type: String
    // },
    // img: {
    //     type: String
    // },
    // link: {
    //     type: String
    // }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;