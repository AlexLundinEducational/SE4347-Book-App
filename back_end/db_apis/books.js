const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select ISBN "ISBN",
    AUTHOR "AUTHOR",
    TITLE "TITLE",
    PRICE "PRICE",
    SUBJECT "SUBJECT"
  from BOOKS
  where 1 = 1`;

const sortableColumns = ['ISBN', 'TITLE'];

async function find(context) {
  let query = baseQuery;
  const binds = {};
  
  if (context.AUTHOR) {
    binds.AUTHOR = context.AUTHOR;
    binds.AUTHOR = '^' + binds.AUTHOR;
    query += '\nand REGEXP_LIKE(AUTHOR, :AUTHOR, \'i\')';
	console.log('\nBinds AUTHOR ' + binds.AUTHOR);
  }
  
  if (context.ISBN) {
    binds.ISBN = context.ISBN; 
    binds.ISBN = '^' + binds.ISBN;
    query += '\nand REGEXP_LIKE(ISBN, :ISBN, \'i\')';
	console.log('\nBinds isbn ' + binds.ISBN);
  }
  
  if (context.SUBJECT) {
    binds.SUBJECT = context.SUBJECT; 
    query += '\nand SUBJECT = :SUBJECT';
	console.log('\nBinds subject ' + binds.SUBJECT);
  }    
  
  if (context.TITLE) {
    binds.TITLE = context.TITLE;
    binds.TITLE = '^' + binds.TITLE;		
    query += '\nand REGEXP_LIKE(TITLE, :TITLE, \'i\')';
	console.log('\nBinds title ' + binds.TITLE);
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

  
  console.log('\nQuery string is: \n' + query);
  const result = await database.simpleExecute(query, binds);
	
  console.log('\nQuery complete.');
  return result.rows;
}

module.exports.find = find;

