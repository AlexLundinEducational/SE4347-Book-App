const express = require('express');
const router = new express.Router();
const books = require('../controllers/books.js');
const books_subject = require('../controllers/books_subject.js');
const books_title = require('../controllers/books_title.js');

router.route('/books/:isbn?')
  .get(books.get);

module.exports = router;
