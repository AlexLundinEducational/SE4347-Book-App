const express = require('express');
const router = new express.Router();
const books = require('../controllers/books.js');

router.route('/books/:isbn?')
  .get(books.get)
  .post(books.post)
  .put(books.put)
  .delete(books.delete);

module.exports = router;
