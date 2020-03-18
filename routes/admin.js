var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');


var con = require('./connection');

const query = util.promisify(con.query).bind(con);

/* GET home page. */

router.get('/', function(req, res, next) {
  (async () => {
    let user =  req.session.user,
    userID = req.session.userID;
    
    if(userID == null){
      res.redirect('/login');
      return;
    }
	 
    res.render('admin', {title: 'Admin', css: 'admin', page: 'index'});
    
  })();
});
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
  return;
});

module.exports = router;
