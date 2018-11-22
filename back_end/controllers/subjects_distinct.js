const subjects_distinct = require('../db_apis/subjects_distinct.js');

async function get(req, res, next) {
  try {
    const context = {};

    const rows = await subjects_distinct.find(context);

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