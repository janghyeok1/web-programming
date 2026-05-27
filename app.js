const express = require("express"), http = require("http");
const static = require("serve-static");
const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 8080);
app.set("host", "100.88.98.57");
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.listen(app.get("port"), "0.0.0.0", () => {
    console.log("Express server running at" + app.get("port") + app.get("host"));
});
/*app.post('/login', (req, res) => {
    const {id, password} = req.body;
    console.log(`사용자 id: ${id}, password: ${password}`);
});
app.use((req, res, next) => {
    const str = "첫 번째 미들웨어 실행";
    console.log(str);
    next();
});
app.use("/", (req, res, next) => {
    const str = "요청 패스 (\/)에 대한 미들웨어 실행";
    console.log(str);
    next();
});
app.get('/search',(req, res) => {
    const {title, author} = req.query;
    //console.log(`사용자 요청 내용: ${title}: ${author}`);
    res.send(`사용자 요청 내용: ${title}: ${author}이 처리되었습니다`);
});
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.get("/test", (req, res) => {
    res.redirect("http://www.google.com");
});
app.all("{*path}", (req, res) => {
    res.status(404).send(`<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>`);
});*/
app.get("/", (req, res) => {
    res.redirect("playjs_p2.html");
});
//npm init, node app.js