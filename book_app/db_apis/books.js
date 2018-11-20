const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select ISBN "ISBN",
    AUTHOR "AUTHOR",
    TITLE "TITLE",
    PRICE "PRICE",
    SUBJECT "SUBJECT",
  from employees
  where 1 = 1`;

const sortableColumns = ['ISBN'];

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.ISBN) {
    binds.ISBN = context.ISBN;
 
    query += '\nand ISBN = :ISBN';
  }
 

  if (context.sort === undefined) {
    query += '\norder by TITLE asc';
  } else {
    let [column, order] = context.sort.split(':');
 
    if (!sortableColumns.includes(column)) {
      throw new Error('Invalid "sort" column');
    }
 
    if (order === undefined) {
      order = 'asc';
    }
 
    if (order !== 'asc' && order !== 'desc') {
      throw new Error('Invalid "sort" order');
    }
 
    query += `\norder by "${column}" ${order}`;
  }

  if (context.skip) {
    binds.row_offset = context.skip;

    query += '\noffset :row_offset rows';
  }

  const limit = (context.limit > 0) ? context.limit : 30;

  binds.row_limit = limit;

  query += '\nfetch next :row_limit rows only';

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

