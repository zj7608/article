const express = require("express");
const back = express.Router();
const userModel = require("./class/UserClass");
const user = new userModel();

back.use(express.urlencoded({ extended: true }));
back.use(express.json());
back.all("*", function (req, res, next) {
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

//用户登录,判断账号密码是否正确
back.post("/backend/user", async (req, res) => {
  try {
    let user_name = req.body["user_name"];
    let user_pwd = req.body["user_pwd"];
    async function userLogin() {
      return await user.userLogin(user_name, user_pwd);
    }
    let state = await userLogin();
    let date = { num: state };
    res.send(date);
  } catch (e) {
    console.log(e);
  }
});

//验证用户名是否存在,不存在就把用户数据入库
back.post("/backend/user/add", async (req, res) => {
  try {
    let data = req.body;
    async function userAdd() {
      return await user.userAdd(data);
    }
    let state = await userAdd();

    let date = { num: state };
    res.send(date);
  } catch (e) {
    console.log(e);
  }
});

module.exports = back;
