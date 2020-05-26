var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');


var con = require('./connection');

const query = util.promisify(con.query).bind(con);

/* GET home page. */

router.get('/', function(req, res, next) {
  (async () => {
    try{
      let sess = req.session;
      

      const rd_pics_list = await query("SELECT * FROM pic");
      const pic_ID = Math.floor(Math.random() * Math.floor(rd_pics_list.length));
      const rd_pic = await query("SELECT * FROM pic WHERE pic_ID = " + rd_pics_list[pic_ID].pic_ID); 

    
      res.render('index', {title: 'Trang chủ', css: 'style', page: 'index', sess, rd_pic});
    }catch(err){
      console.log(err);
      render('error', {message: 404});
    }
  })();
});


module.exports = router;
