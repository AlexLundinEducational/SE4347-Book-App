const books = require('../db_apis/books.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.ISBN = parseInt(req.params.isbn, 10);
	context.ISBN = context.ISBN.toString();  
    //context.skip = parseInt(req.query.skip, 10);
    //context.limit = parseInt(req.query.limit, 10);
    //context.sort = req.query.sort;

    const rows = await books.find(context);

    if (req.params.ISBN) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

function getBookFromRec(req) {
  const book = {
    ISBN: req.body.ISBN,
    AUTHOR: req.body.AUTHOR,
    TITLE: req.body.TITLE,
    PRICE: req.body.PRICE,
    SUBJECT: req.body.SUBJECT,
  };

  return book;
}

async function post(req, res, next) {
  try {
    let book = getBookFromRec(req);

    book = await books.create(book);

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let book = getBookFromRec(req);

    book.ISBN = parseInt(req.params.ISBN, 10);

    book = await books.update(book);

    if (book !== null) {
      res.status(200).json(book);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;

async function del(req, res, next) {
  try {
    const ISBN = parseInt(req.params.ISBN, 10);

    const success = await books.delete(ISBN);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;

