var sqlMould  = require("./sql.class");
var sql       = new sqlMould(); 


class userModel{

    constructor() {   
    }
    //用户登录操作，通过账号密码查询数据库，如果数据全部相同则data的长度不等于0
    async userLogin(user_name,user_pwd){
        let user_name = user_name;
        let user_pwd  = user_pwd;
        let table     = "artuser";
        let key       = "*";
        let cond      =" user_name = '"+user_name+"' AND user_pwd = '"+user_pwd+"'";
        async function findUser(){
            var date = await sql.Find(table,key,cond);
            return date;
        }
        let data = await findUser();
        if (data.length == 0) {
            return '0';
        }else{
            
            return '1';
        }
    }
    //添加用户操作，先查询用户名是否与数据库有相同的，如果没有相同的用户名就进行添加操作
    async userAdd(data){
        let data = data;
        async function findUser(){
            let table = "artuser";
            let key   = "*";
            let cond  = " user_name = '"+data[0]+"'";
            await sql.Begin();
            let data =  await sql.Find(table,key,cond);
            if (data.length != 0) {
                await sql.Commit();
                return '0';
            }else{
                let table = "artuser";
                let field = "user_name,user_pwd,user_mail,user_tel";
                let cond  = "'"+data[0]+"','"+data[1]+"','"+data[2]+"','"+data[3]+"'";
                await sql.Insert(table,field,cond);
                await sql.Commit();
                return '1';
            }
        }
        return findUser();
    }


}

module.exports = userModel;