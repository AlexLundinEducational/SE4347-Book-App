const members = require('../db_apis/members.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.USERID = parseInt(req.params.USERID, 10);
	context.USERID = context.USERID.toString();  
    context.sort = req.query.sort;

    const rows = await members.find(context);

    if (req.params.USERID) {
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


function getMemberFromRec(req) {
  const member = {
	USERID: req.body.USERID
  };
  

  return member;
}

async function post(req, res, next) {
  try {
	  
	const context = {};
    context.USERID = req.params.USERID;
	//context.USERID = context.USERID.toString();  
    context.sort = req.query.sort;
	
	console.log('\nuserid is.' + context.USERID);
	
    let member = getMemberFromRec(req);
	
	// set required feilds
	member.USERID =  context.USERID;
    member = await members.create(member);
	
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
