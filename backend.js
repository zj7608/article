const express = require("express");
const back    = express.Router();
const cookieParser = require('cookie-parser');
var userModel = require('./class/user.class');
var user      = new userModel();
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
    async function userLogin(){
        return await user.userLogin(user_name,user_pwd);
    }
    let state = await userLogin();
    if (state == '1') {
        res.cookie("user_name",user_name);
    }
    res.send(state);
})


//跳转到addUser页面 注册用户
back.get("/backend/addUser",(req,res) => {
    res.sendFile(__dirname+'/public/user/addUser.html');
})


//验证用户名是否存在,不存在就把用户数据入库
back.post("/backend/user/add",async (req,res) => {
    let data = req.body;
    let user_name = req.body[0];
    async function userAdd(){
        return await user.userAdd(data);
    }
    let state = await userAdd();
    if (state == '1') {
        res.cookie("user_name",user_name);
    }
    res.send(state);
})


module.exports = back;