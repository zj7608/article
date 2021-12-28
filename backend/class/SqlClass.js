const db = require("../dbconfig");

/**
 * sql语句封装类
 * Insert 插入sql语句
 * Delete 删除sql语句
 * Put    单条修改语句
 * Find   单条查询语句
 * Selet  两表联查语句
 */

class sqlMould {
  constructor() {}

  async ChackTable() {
    let article = await db.query("SHOW TABLES LIKE '%article%'");
    if (article == false) {
      await db.query(
        "CREATE TABLE article (article_id int(11) primary key not null auto_increment,article_title varchar(100) not null, article_content text not null, user_id int(11) not null, article_addTime datetime not null)"
      );
    }

    let artuser = await db.query("SHOW TABLES LIKE '%artuser%'");
    if (artuser == false) {
      await db.query(
        "CREATE TABLE artuser (user_id int(11) primary key not null auto_increment, user_name varchar(30) not null, user_pwd varchar(50) not null, user_tel varchar(15) not null, user_mail varchar(100) not null)"
      );
    }
    let comment = await db.query("SHOW TABLES LIKE '%comment%'");
    if (comment == false) {
      await db.query(
        "CREATE TABLE comment (comment_id int(11) primary key not null auto_increment, article_id int(11) not null, comment_content varchar(255) not null, user_name varchar(30) not null, comment_addTime datetime not null)"
      );
    }
  }

  //插入语句
  async Insert(Table, Field, val) {
    try {
      let date = db.query(
        "INSERT INTO " + Table + " ( " + Field + " ) VALUES ( " + val + " )"
      );
      return date;
    } catch (e) {
      console.log(e);
    }
  }

  //删除语句
  async Delete(Table, field, val) {
    try {
      let date = db.query(
        "DELETE FROM " + Table + " WHERE " + field + " = '" + val + "'"
      );
      return date;
    } catch (e) {
      console.log(e);
    }
  }

  //修改语句
  async Put(Table, Field1, val1, Field2, val2) {
    try {
      let date = db.query(
        "UPDATE " +
          Table +
          " SET " +
          Field1 +
          " = '" +
          val1 +
          "' WHERE " +
          Field2 +
          " = '" +
          val2 +
          "'"
      );
      return date;
    } catch (e) {
      console.log(e);
    }
  }

  //单条查询语句
  async Find(Table, key, Condition) {
    try {
      if (Condition) {
        let date = db.query(
          "SELECT " + key + " FROM " + Table + " WHERE " + Condition
        );
        return date;
      } else {
        let find = db.query("SELECT * FROM " + Table);
        return find;
      }
    } catch (e) {
      console.log(e);
    }
  }

  //两表联查语句
  async Select(Table1, Table2, Key, val1) {
    if (val1) {
      try {
        let date = db.query(
          "SELECT * FROM " +
            Table1 +
            "  INNER JOIN " +
            Table2 +
            " ON " +
            Table1 +
            "." +
            Key +
            " = " +
            Table2 +
            "." +
            Key +
            " WHERE " +
            Table2 +
            "." +
            Key +
            "= '" +
            val1 +
            "'"
        );
        return date;
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let date = db.query(
          "SELECT * FROM " +
            Table1 +
            "  INNER JOIN " +
            Table2 +
            " ON " +
            Table1 +
            "." +
            Key +
            " = " +
            Table2 +
            "." +
            Key
        );
        return date;
      } catch (e) {
        console.log(e);
      }
    }
  }
}

module.exports = sqlMould;
