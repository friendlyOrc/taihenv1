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
      const articles = await query('SELECT * FROM article ORDER BY article.ar_date DESC LIMIT 10');
      let cate = [];
      let chapters = [];
      for(let i = 0; i < articles.length; i++){
        let query2 = "SELECT * FROM ar_cat INNER JOIN category ON category.cat_ID = ar_cat.cat_ID WHERE ar_cat.ar_ID = ? ";
        cate[i] = await query(query2, articles[i].ar_ID);
        let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC LIMIT 1";
        chapters[i] = await query(query3, articles[i].ar_ID);
      }
      
      const hot_articles = await query('SELECT * FROM article ORDER BY article.ar_view DESC LIMIT 6');
      let hot_chapter = [];
      for(let i = 0; i < hot_articles.length; i++){
        let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC LIMIT 1";
        hot_chapter[i] = await query(query3, hot_articles[i].ar_ID);
      }

      const rd_pics_list = await query("SELECT * FROM pic");
      const pic_ID = Math.floor(Math.random() * Math.floor(rd_pics_list.length)) + 1;
      const rd_pic = await query("SELECT * FROM pic WHERE pic_ID = " + rd_pics_list[pic_ID].pic_ID); 

      const top_articles = await query("SELECT count_view.ar_ID, article.ar_name, article.ar_pic, COUNT(count_view.ar_ID) as num FROM count_view INNER JOIN article ON count_view.ar_ID = article.ar_ID WHERE MONTH(count_view.`time`) = MONTH(curdate()) GROUP BY count_view.ar_ID ORDER BY num DESC LIMIT 8;");
      let top_chapter = [];
      for(let i = 0; i < top_articles.length; i++){
        let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC LIMIT 1";
        top_chapter[i] = await query(query3, top_articles[i].ar_ID);
      }
      // console.log(articles);
      console.log(cate);
      // console.log(chapters);
      // console.log(hot_chapter);
      // console.log(top_articles);
      res.render('index', {title: 'Trang chủ', css: 'style', page: 'index', articles, chapters, cate, hot_articles, hot_chapter, rd_pic, top_articles, top_chapter});
    }catch(err){
      console.log(err);
      render('error', {message: 404});
    }
  })();
});


module.exports = router;
