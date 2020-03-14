var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');

var con = require('./connection');

const query = util.promisify(con.query).bind(con);

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

/* GET CATEGORY. */
router.get('/', function(req, res, next) {
  (async () => {

    const top_articles = await query("SELECT count_view.ar_ID, article.ar_name, article.ar_pic, COUNT(count_view.ar_ID) as num FROM count_view INNER JOIN article ON count_view.ar_ID = article.ar_ID WHERE MONTH(count_view.`time`) = MONTH(curdate()) GROUP BY count_view.ar_ID ORDER BY num DESC LIMIT 8;");
    let top_chapter = [];
    for(let i = 0; i < top_articles.length; i++){
      let query3 = "SELECT * from chapter WHERE chapter.ar_ID = ? ORDER BY chapter.chap_ID DESC LIMIT 1";
      top_chapter[i] = await query(query3, top_articles[i].ar_ID);
    }

    const category = await query("SELECT * FROM category");
    
    res.render('category', {title: 'Thể loại - Taihen', css: 'category', page: 'category', category, top_articles, top_chapter});
  })();
});

module.exports = router;
