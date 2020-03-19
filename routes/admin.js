var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');


var con = require('./connection');

const query = util.promisify(con.query).bind(con);

/* GET home page. */

router.get('/', function(req, res, next) {
  (async () => {
    let sess = req.session;
    let user =  sess.user,
    userID = sess.userID;
    
    if(userID == null){
      res.redirect('/login');
      return;
    }
    sess.articles = await query('SELECT * FROM article ORDER BY article.ar_date DESC LIMIT 10');
    sess.cate = [];
    sess.chapters = [];
    for(let i = 0; i < sess.articles.length; i++){
      let query2 = "SELECT * FROM ar_cat INNER JOIN category ON category.cat_ID = ar_cat.cat_ID WHERE ar_cat.ar_ID = ? ";
      sess.cate[i] = await query(query2, sess.articles[i].ar_ID);
      let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC";
      sess.chapters[i] = await query(query3, sess.articles[i].ar_ID);
    }
    sess.category = await query("SELECT * FROM category");
    sess.account = await query("SELECT * FROM account");
    sess.view = await query("SELECT * FROM count_view");

    res.render('admin', {title: 'Admin', css: 'admin', page: 'sub_admin', sess});
    
  })();
});
router.get('/user', function(req, res, next){
  let sess = req.session;
  let user =  sess.user,
  userID = sess.userID;
  
  if(userID == null){
    res.redirect('/login');
    return;
  }
  res.render('admin', {title: 'User', css: 'admin', page: 'user', sess});
});
router.get('/add_user', function(req, res, next){
  let sess = req.session;
  let user =  sess.user,
  userID = sess.userID;
  
  if(userID == null){
    res.redirect('/login');
    return;
  }
  res.render('admin', {title: 'Add user', css: 'admin', page: 'add_user', sess, message: ''});
});
router.post('/add_user', function(req, res, next){
  (async () =>{
    let mess = '';
    let sess = req.session;
    let user =  sess.user,
    userID = sess.userID;
    
    if(userID == null){
      res.redirect('/login');
      return;
    }
    let acc = req.body.mail;
    let pass = req.body.pass;
    let repass = req.body.repass;
    if(acc && pass && repass){
      let rs = await query(`SELECT * FROM account WHERE email = '${acc}'`);
      if(rs.length){
        mess = 'wrong';
        res.render('admin', {title: 'Thêm User', css: 'admin', page: 'add_user',sess, message: mess});
      }else{
        if(pass !== repass){
          mess = 'pass';
          res.render('admin', {title: 'Thêm User', css: 'admin', page: 'add_user', sess, message: mess});
        }else{
          const ID = parseInt(sess.account[sess.account.length - 1].accID) + 1;
          await query(`INSERT INTO account (accID, email, password) VALUES (${ID}, '${acc}', '${pass}')`);
          mess = 'accept';
          sess.account = await query('SELECT * FROM account');
          res.render('admin', {title: 'Thêm User', css: 'admin', page: 'add_user', sess, message: mess});
        }
        
      }
    }else{
      mess = 'empty';
      res.render('admin', {title: 'Thêm User', css: 'admin', page: 'add_user', sess, message: mess});
    }
  })();
});

router.get('/delete_user', function(req, res, next){
  (async () => {
    let sess = req.session;
    let user =  sess.user,
    userID = sess.userID;
    
    if(userID == null){
      res.redirect('/login');
      return;
    }
    const ID = req.query.id;

    await query("DELETE FROM account WHERE accID = " + ID);
    sess.account = await query('SELECT * FROM account');
    
    res.redirect('/admin/user');
  })();
});
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
  return;
});

module.exports = router;
