var db = {};
var mysql = require('mysql');

const pool = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password:"123456",
    database :"test"
})

db.query = function(sql){
    return new Promise (function(resolve, reject){
    if (!sql) {
        reject("sql语句错误");
    }
    pool.query(sql,function(err,rows,fields) {
        if (err) {
            reject(err);
        }
        resolve(rows,fields);
    })
    })
}
module.exports = db;