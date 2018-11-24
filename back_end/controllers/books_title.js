const books_title = require('../db_apis/books.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.TITLE = parseInt(req.params.TITLE, 10);
	context.TITLE = context.TITLE.toString();
    context.sort = req.query.sort;

    const rows = await books_title.find(context);

    if (req.params.TITLE) {
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