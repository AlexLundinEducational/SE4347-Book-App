const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select DISTINCT SUBJECT "SUBJECT"
  from BOOKS
  where 1 = 1`;


async function find(context) {
  let query = baseQuery;
  const binds = {};

  
  console.log('\nQuery string is: \n' + query);
  const result = await database.simpleExecute(query, binds);
	
  console.log('\nQuery complete.');
  return result.rows;
}

module.exports.find = find;

