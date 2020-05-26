var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');

var con = require('./connection');

const query = util.promisify(con.query).bind(con);

/* GET ARTICLE. */
router.get('/:id', async function(req, res, next) {
  
  try{
    let sess = req.session;
    
    const ID = parseInt(req.params.id);

    let index;
    for(let i = 0; i < sess.articles.length; i++){
      if(sess.articles[i].ar_ID === ID){
        index = i;
        break;
      }
    }
    console.log(sess.chapters[index]);
    
    let cate_list = "";
    for(let i = 0; i < sess.cate[index].length; i++){
      cate_list += await sess.cate[index][i].cat_ID;
      if(i != sess.cate[index].length - 1)cate_list += ", ";
    }
    // console.log(cate_list);
    let same_cate = [];
    let same_chapter = [];
    if(cate_list){
      same_cate = await query("SELECT * FROM article, ar_cat WHERE ar_cat.ar_ID = article.ar_ID AND ar_cat.cat_ID IN (" + cate_list + ") AND article.ar_ID <> " +sess.articles[index].ar_ID +" GROUP BY article.ar_ID");
      same_chapter = [];
      for(let i = 0; i < same_cate.length; i++){
        let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC LIMIT 1";
        same_chapter[i] = await query(query3, same_cate[i].ar_ID);
      }
    }
    res.render('article', {title: 'Truyện: ' + sess.articles[index].ar_name, css: 'article', page: 'article', sess, same_cate, same_chapter, index});
    
  }catch (err){
    console.log(err);
    res.render('error', {message: 404});
  }
  
  
});

module.exports = router;
