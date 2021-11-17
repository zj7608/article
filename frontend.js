const express = require("express");
const front = express.Router();
const cookieParser = require('cookie-parser');
var time = require('silly-datetime');
var sqlMould = require("./sql.class");
var sql = new sqlMould();
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
front.get("/frontend/article",(req,res) => {
    async function articleDate(){
        let table1 = "article";
        let table2 = "artuser";
        let val    = "user_id";
        let result   = await sql.Select(table1,table2,val); 
        var arr  = [];
        result.forEach(function(val,key) {
            arr[key] = {
                article_id :val['article_id'],
                article_title :val['article_title'],
                user_name : val['user_name'],
            }
        });
        var data = JSON.stringify(arr);
        res.send(data);
    }articleDate();
})

//文章详情
front.get("/frontend/article/sel",(req,res) => {
    let table = "article";
    let key   = "*";
    let val   = "article_id = '"+req.query[0]+"'";
    async function content(){
        var date = await sql.Find(table,key,val);
        var title   = date[0].article_title;
        var content = date[0].article_content;
        var data =  JSON.stringify({article_title:title,article_content:content});
        res.send(data);
    }
    content();        
})


//跳转到文章发表页面
front.get("/frontend/article/publish",(req,res) => {
    res.sendFile(__dirname+'/public/article/publishArticle.html');
})


//发布文章
front.post("/frontend/article/add", async (req,res) => {
    var addTime = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    
    let article_title    = req.body['article_title'];
    let article_content  = req.body['article_content'];
    //判断文章标题和内容是否有空的
    if (article_title == '' || article_content == '' ) {
        res.send("0");
    }else{
        //因为文章入库需要用户的id 所以先查询用户id
        async function chackUser(){
            let table = "artuser";
            let key   = "user_id"
            let cond  = "user_name = '"+ req.cookies.user_name+"'";
            return await sql.Find(table,key,cond);    
        }   
        var data = await chackUser();

        //取到用户id之后将文章入库
        var user_id = data[0]['user_id'];
        async function addCont(){
            let table = "article";
            let field = "article_title,article_content,user_id,article_addTime";
            let cond  = "'"+article_title+"','"+article_content+"','"+user_id+"','"+addTime+"'";
            return await sql.Insert(table,field,cond); 
        }
        var addArticle = await addCont();
        if (addArticle) {
            res.send("1");
        }
    }
})


//发表评论
front.post("/frontend/addComm",async(req,res) => {
    //获取发表评论的时间
    var addTime = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var comment    = req.body['comment'];
    var article_id = req.body['article_id'];
    //确认发表的评论是否有内容
    if (comment == '') {
        res.send("0");
    }else{
        var user_name   = req.cookies.user_name;
        console.log(user_name);
        async function addComm(){
            let table = "comment";
            let field = "article_id,comment_content,user_name,comment_addTime";
            let val   = "'"+article_id+"','"+comment+"','"+user_name+"','"+addTime+"'";
            return await sql.Insert(table,field,val);
        }
        await addComm();       
        res.send("1");

    }

    
    
})

//查看评论
front.get("/frontend/comment/sel",async(req,res) => {
    var article_id = req.query['article_id'];
    //两表联查 article表和comment表
    async function commentData(){
        let table1 = "article";
        let table2 = "comment";
        let key1    = "article_id";
        let val1   = article_id;    
        return await sql.Select(table1,table2,key1,val1); 
    }
    var articleData = await commentData();
    //取出需要的数据后返回
    var arr = [];
    articleData.forEach(function(val,key) {
        arr[key] = {
            comment_content : val['comment_content'],
            user_name : val['user_name'],
        }
    })
    res.send(arr);


})


module.exports = front;