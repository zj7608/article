const express  = require('express');
const app      = express();
const backend  = require('./backend');
const frontend = require("./frontend");
const cookieParser = require('cookie-parser');


app.use(backend);
app.use(frontend);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("./public/article"));




app.listen(3000, () => 
console.log(`服务器启动成功`)
)