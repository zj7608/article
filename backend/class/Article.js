const sqlMould = require("./SqlClass");
const sql = new sqlMould();

class articleModel {
  constructor() {}
  //首页展示文章标题
  async articleTitle() {
    try {
      let table1 = "article";
      let table2 = "artuser";
      let val = "user_id";
      let result = await sql.Select(table1, table2, val);
      let arr = [];
      result.forEach(function (val, key) {
        arr[key] = {
          article_id: val["article_id"],
          article_title: val["article_title"],
          user_name: val["user_name"],
        };
      });
      let data = JSON.stringify(arr);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //通过点击文章标题展示文章内容
  async articleContent(article_id) {
    try {
      let table = "article";
      let key = "*";
      let val = "article_id = '" + article_id + "'";
      let date = await sql.Find(table, key, val);
      let title = date[0].article_title;
      let content = date[0].article_content;
      let data = JSON.stringify({
        article_title: title,
        article_content: content,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //发表文章，如果文章标题或文章内容为空则禁止发布
  async articleContentAdd(addTime, article_title, article_content, user_name) {
    try {
      if (article_title == "" || article_content == "") {
        return "0";
      } else {
        //因为文章入库需要用户的id 所以先查询用户id
        async function chackUser() {
          let table = "artuser";
          let key = "user_id";
          let cond = "user_name = '" + user_name + "'";
          return await sql.Find(table, key, cond);
        }
        let data = await chackUser();

        //取到用户id之后将文章入库
        let user_id = data[0]["user_id"];
        async function addCont() {
          let table = "article";
          let field = "article_title,article_content,user_id,article_addTime";
          let cond =
            "'" +
            article_title +
            "','" +
            article_content +
            "','" +
            user_id +
            "','" +
            addTime +
            "'";
          return await sql.Insert(table, field, cond);
        }
        let addArticle = await addCont();
        if (addArticle) {
          return "1";
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  //发表评论
  async addComment(article_id, comment, user_name, addTime) {
    try {
      if (comment == "") {
        return "0";
      } else {
        async function addComm() {
          let table = "comment";
          let field = "article_id,comment_content,user_name,comment_addTime";
          let val =
            "'" +
            article_id +
            "','" +
            comment +
            "','" +
            user_name +
            "','" +
            addTime +
            "'";
          return await sql.Insert(table, field, val);
        }
        let state = await addComm();
        if (state) {
          return "1";
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  //查看评论
  async showComment(article_id) {
    try {
      let table1 = "article";
      let table2 = "comment";
      let key1 = "article_id";
      let val1 = article_id;
      let articleData = await sql.Select(table1, table2, key1, val1);
      let arr = [];
      articleData.forEach(function (val, key) {
        arr[key] = {
          comment_content: val["comment_content"],
          user_name: val["user_name"],
        };
      });
      return arr;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = articleModel;
