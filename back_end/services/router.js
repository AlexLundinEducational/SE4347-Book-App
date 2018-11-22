const express = require('express');
const router = new express.Router();
const books = require('../controllers/books.js');
const books_isbn = require('../controllers/books_isbn.js');
const books_subject = require('../controllers/books_subject.js');
const books_title = require('../controllers/books_title.js');
const subjects_distinct = require('../controllers/subjects_distinct.js');

// register a router for all available URL paths for the API
router.route('/books')
  .get(books.get);
  
router.route('/books/isbn/:isbn?')
  .get(books_isbn.get);
  
router.route('/books/subject/:subject?')
  .get(books_subject.get);
  
router.route('/books/title/:TITLE?')
  .get(books_title.get);  
  
router.route('/books/subjects')
  .get(subjects_distinct.get);


module.exports = router;
