const express = require("express");
const front = express.Router();
const cookieParser = require('cookie-parser');
const time = require('silly-datetime');
const articleModel = require('./class/article.class');
const article = new articleModel();

front.use(cookieParser());
front.use(express.urlencoded({ extended: true }));

//查询cookie中是否有用户名 如果存在则返回1不存在则返回0
front.get("/frontend/checkCookie",(req,res) =>{
    if (req.cookies.user_name) {
        res.send("1");
    }else{
        res.send("0");
    }
})


//文章标题展示
front.get("/frontend/articleTitle",async (req,res) => {
    res.send(await article.articleTitle());
})


//文章详情
front.get("/frontend/articleContent", async (req,res) => {
    let article_id = req.query[0];
    res.send(await article.articleContent(article_id));
})


//跳转到文章发表页面
front.get("/frontend/publishArticle",(req,res) => {
    res.sendFile(__dirname+'/public/article/publishArticle.html');
})



//发布文章
front.post("/frontend/addArticle", async (req,res) => {
    let addTime = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let article_title    = req.body['article_title'];
    let article_content  = req.body['article_content'];
    let user_name        = req.cookies.user_name;
    res.send(await article.articleContentAdd(addTime,article_title,article_content,user_name));
    
})


//发表评论
front.post("/frontend/addComment",async(req,res) => {
    //获取发表评论的时间
    let addTime = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let comment    = req.body['comment'];
    let article_id = req.body['article_id'];
    let user_name  = req.cookies.user_name;
    res.send( await article.addComment(article_id,comment,user_name,addTime));
    
})

//查看评论
front.get("/frontend/showComment",async(req,res) => {
    var article_id = req.query['article_id'];
    res.send(await article.showComment(article_id));
})


module.exports = front;