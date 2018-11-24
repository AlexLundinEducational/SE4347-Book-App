const books_author = require('../db_apis/books.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.AUTHOR = req.params.author;

    const rows = await books_author.find(context);

    if (req.params.AUTHOR) {
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