const express = require("express");
const front = express.Router();
const time = require("silly-datetime");
const articleModel = require("./class/Article");
const article = new articleModel();

front.use(express.urlencoded({ extended: true }));
front.use(express.json());

front.all("*", function (req, res, next) {
  //允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

//查询cookie中是否有用户名 如果存在则返回1不存在则返回0

//文章标题展示
front.get("/frontend/articleTitle", async (req, res) => {
  try {
    res.send(await article.articleTitle());
  } catch (e) {
    console.log(e);
  }
});

//文章详情
front.post("/frontend/articleContent", async (req, res) => {
  try {
    let article_id = req.body["article_id"];
    res.send(await article.articleContent(article_id));
  } catch (e) {
    console.log(e);
  }
});

//发布文章
front.post("/frontend/addArticle", async (req, res) => {
  try {
    let addTime = time.format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let article_title = req.body["article_title"];
    let article_content = req.body["article_content"];
    let user_name = req.body["user_name"];
    let state = await article.articleContentAdd(
      addTime,
      article_title,
      article_content,
      user_name
    );
    //angular需要用对象的方式传值
    let num = { num: state };
    res.send(num);
  } catch (e) {
    console.log(e);
  }
});

//发表评论
front.post("/frontend/addComment", async (req, res) => {
  //获取发表评论的时间
  try {
    let addTime = time.format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let article_id = req.body["article_id"];
    let comment = req.body["comment"];
    let user_name = req.body["user_name"];
    let state = await article.addComment(
      article_id,
      comment,
      user_name,
      addTime
    );
    let num = { num: state };
    res.send(num);
  } catch (e) {
    console.log(e);
  }
});

//查看评论
front.post("/frontend/showComment", async (req, res) => {
  try {
    var article_id = req.body["article_id"];
    res.send(await article.showComment(article_id));
  } catch (e) {
    console.log(e);
  }
});

module.exports = front;
