const express = require('express');
const router = new express.Router();
const books = require('../controllers/books.js');
const books_author = require('../controllers/books_author.js');
const books_isbn = require('../controllers/books_isbn.js');
const books_subject = require('../controllers/books_subject.js');
const books_title = require('../controllers/books_title.js');
const subjects_distinct = require('../controllers/subjects_distinct.js');

const members = require('../controllers/members.js');

// register a router for all available URL paths for the API
router.route('/books')
  .get(books.get);
 
router.route('/books/author/:author?')
  .get(books_author.get);
  
router.route('/books/isbn/:isbn?')
  .get(books_isbn.get);
  
router.route('/books/subject/:subject?')
  .get(books_subject.get);
  
router.route('/books/title/:title?')
  .get(books_title.get);  
  
router.route('/books/SUBJECTS')
  .get(subjects_distinct.get);

router.route('/books/members/userid/:USERID?')
  .get(members.get)
  .post(members.post);
  
/* router.route('/orders/:userid?')
  .get(orders_userid.get)   */
  
module.exports = router;
