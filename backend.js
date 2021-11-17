const express = require("express");
const back    = express.Router();
const cookieParser = require('cookie-parser');
var sqlMould  = require("./sql.class");
var sql       = new sqlMould(); 
back.use(cookieParser());
back.use(express.urlencoded({ extended: true }))

//跳转到userLogin页面
back.get("/backend/loging",(req,res) => {
    res.sendFile(__dirname+'/public/user/userLogin.html'); 
})


//用户登录,判断账号密码是否正确
back.get("/backend/user",async(req,res) => {
    let user_name = req.query[0];
    let user_pwd  = req.query[1];
    let table     = "artuser";
    let key       = "*";
    let cond      =" user_name = '"+user_name+"' AND user_pwd = '"+user_pwd+"'";
    async function findUser(){
        var date = await sql.Find(table,key,cond);
        return date;
    }

    var data = await findUser();
    if (data.length === 0) {
        res.send("0");
    }else{
        res.cookie("user_name",user_name);
        res.send("1");
    }
})


//跳转到addUser页面 注册用户
back.get("/backend/addUser",(req,res) => {
    res.sendFile(__dirname+'/public/user/addUser.html');
})


//验证用户名是否存在,不存在就把用户数据入库
back.post("/backend/user/add",async (req,res) => {

    let user_name = req.body[0];
    let user_pwd  = req.body[1];
    let user_mail = req.body[2];
    let user_tel  = req.body[3];
    async function findUser(){
        let table = "artuser";
        let key   = "*";
        let cond  = " user_name = '"+user_name+"'";
        await sql.Begin();
        let data =  await sql.Find(table,key,cond);
        if (data.length != 0) {
            await sql.Commit();
            res.send("0");
        }else{
            let table = "artuser";
            let field = "user_name,user_pwd,user_mail,user_tel";
            let cond  = "'"+user_name+"','"+user_pwd+"','"+user_mail+"','"+user_tel+"'";
            await sql.Insert(table,field,cond);
            await sql.Commit();
            res.send("1");
        }
    }
    findUser();

})


module.exports = back;