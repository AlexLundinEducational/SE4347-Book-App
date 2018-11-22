const books_isbn = require('../db_apis/books.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.ISBN = parseInt(req.params.isbn, 10);
	context.ISBN = context.ISBN.toString();  
    context.sort = req.query.sort;

    const rows = await books_isbn.find(context);

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