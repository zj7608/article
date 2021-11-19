const db = require("../dbconfig");

/**
 * sql语句封装类
 * Insert 插入sql语句
 * Delete 删除sql语句
 * Put    单条修改语句
 * Find   单条查询语句
 * Selet  两表联查语句
 */

class sqlMould{

    constructor() {   
    }

    //插入语句
    async Insert(Table,Field,val){
        var date = db.query("INSERT INTO "+Table+" ( "+Field+" ) VALUES ( "+val+ " )");
        return date;
    }

    //删除语句
    async Delete(Table,field,val){
        var date = db.query("DELETE FROM "+Table+" WHERE "+field+" = '"+val+"'" );
        return date;
    }

    //修改语句
    async Put(Table,Field1,val1,Field2,val2){
        var date = db.query("UPDATE "+Table+" SET "+Field1+" = '"+val1+"' WHERE "+Field2+" = '"+val2+"'");
        return date;
    }

    //单条查询语句
    async Find(Table,key,Condition){
        if (Condition) {
            var date = db.query("SELECT "+key+" FROM "+Table+" WHERE "+Condition);
            return date;
        }else{
            var find = db.query("SELECT * FROM "+Table);
            return find;
        }
        
    }

    //两表联查语句
    async Select(Table1,Table2,Key,val1){
        if (val1) {
            var date = db.query("SELECT * FROM "+Table1+"  INNER JOIN "+Table2+" ON "+Table1+"."+Key+" = "+Table2+"."+Key+" WHERE "+Table2+"."+Key+"= '"+val1+"'");
            return date; 
        }else{
            var date = db.query("SELECT * FROM "+Table1+"  INNER JOIN "+Table2+" ON "+Table1+"."+Key+" = "+Table2+"."+Key);
            return date;
        }            
    }

    async Begin(){
       var data =  db.query("BEGIN;");
       return data;
    }

    async Commit(){
       var data = db.query("COMMIT;");
       return data;
    }

}

module.exports = sqlMould;