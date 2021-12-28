const express = require("express");
const app = express();
const backend = require("./backend");
const frontend = require("./frontend");
const sqlClass = require("./class/SqlClass");

app.use(backend);
app.use(frontend);
app.use(express.json());

async function chaktable() {
  try {
    let sql = new sqlClass();
    await sql.ChackTable();
  } catch (e) {
    console.log(e);
  }
}
chaktable();

app.listen(3000, () => {
  console.log("服务器启动成功");
});
