var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b9793d0b8e99d6',
    password : '81c0149c',
    database: "heroku_f3a0240d5774223",
    dateStrings: true
  });

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;


// host     : 'us-cdbr-iron-east-04.cleardb.net',
// user     : 'b9793d0b8e99d6',
// password : '81c0149c',
// database: "taihen",
// dateStrings: true

// host: "localhost",
//     user: "root",
//     password: "G34r1#c42&",
//     database: "taihen",
//     dateStrings: true