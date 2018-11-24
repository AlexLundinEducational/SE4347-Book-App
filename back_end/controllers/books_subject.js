const books_subject = require('../db_apis/books.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.SUBJECT = req.params.subject; 
    context.sort = req.query.sort;

    const rows = await books_subject.find(context);

    if (req.params.SUBJECT) {
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