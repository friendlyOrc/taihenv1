var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');

var con = require('./connection');

const query = util.promisify(con.query).bind(con);

/* GET ARTICLE. */
router.get('/:id', async function(req, res, next) {
  
  let id = parseInt(req.params.id);
  if(!id){
    res.render('error', {message: '404'});
  }else {
    try{
      const article = await query("SELECT * FROM article where article.ar_ID = " + id);
      const chapters = await query("SELECT * FROM chapter where chapter.ar_ID = " + id);
      const cate = await query("SELECT * FROM ar_cat INNER JOIN category ON category.cat_ID = ar_cat.cat_ID WHERE ar_cat.ar_ID = " + id);
      // console.log(article);
      // console.log(chapters);
      // console.log(cate);
      let cate_list = "";
      for(let i = 0; i < cate.length; i++){
        cate_list += await cate[i].cat_ID;
        if(i != cate.length - 1)cate_list += ", ";
      }
      // console.log(cate_list);
      const same_cate = await query("SELECT * FROM article, ar_cat WHERE ar_cat.ar_ID = article.ar_ID AND ar_cat.cat_ID IN (" + cate_list + ") AND article.ar_ID <> " +article[0].ar_ID +" GROUP BY article.ar_ID");
      let same_chapter = [];
      for(let i = 0; i < same_cate.length; i++){
        let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC LIMIT 1";
        same_chapter[i] = await query(query3, same_cate[i].ar_ID);
      }
      res.render('article', {title: 'Truyện: ' + article[0].ar_name, css: 'article', page: 'article', article, chapters, cate, same_cate, same_chapter});
      
    }catch (err){
      console.log(err);
      res.render('error', {message: 404});
    }
    
  }
  
});

module.exports = router;
