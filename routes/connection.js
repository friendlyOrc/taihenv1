var mysql = require('mysql');
var connection;
var db_config = {
  host: "localhost",
    user: "root",
    password: "G34r1#c42&",
    database: "taihen",
    dateStrings: true
};

function handleDisconnect() {
  connection = mysql.createPool(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  // connection.connect(function(err) {              // The server is either down
  //   if(err) {                                     // or restarting (takes a while sometimes).
  //     console.log('error when connecting to db:', err);
  //     handleDisconnect(); 
  //   }                                     
  // });                                    
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = connection;


// host     : 'us-cdbr-iron-east-04.cleardb.net',
// user     : 'b9793d0b8e99d6',
// password : '81c0149c',
// database: "heroku_f3a0240d5774223",
// dateStrings: true

// host: "localhost",
//     user: "root",
//     password: "G34r1#c42&",
//     database: "taihen",
//     dateStrings: true