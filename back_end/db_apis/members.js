const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select USERID "USERID",
		FNAME "FNAME"
  from MEMBERS
  where 1 = 1`;

const sortableColumns = ['USERID', 'TITLE'];

async function find(context) {
  let query = baseQuery;
  const binds = {};
  
  if (context.USERID) {
    binds.USERID = context.USERID; 
    binds.USERID = '^' + binds.USERID;
    query += '\nand REGEXP_LIKE(USERID, :USERID, \'i\')';
	console.log('\nBinds userid ' + binds.USERID);
  }
  
  console.log('\nQuery string is: \n' + query);
  const result = await database.simpleExecute(query, binds);
	
  console.log('\nQuery complete.');
  return result.rows;
}

module.exports.find = find;

const createSql =
 `insert into MEMBERS (
    USERID
  ) values (
    :USERID
  ) `;

async function create(mem) {
  const member = Object.assign({}, mem);
  
  
  console.log('\nCreate started.' + member.USERID);
  
  const result = await database.simpleExecute(createSql, member);


  return member;
}

module.exports.create = create;