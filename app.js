const express = require("express"), http = require("http");
const static = require("serve-static");
const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 8080);
app.set("host", "203.252.166.181");
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const fs = require('fs');
app.get("/", (req, res) => {
    res.redirect("playjs_p2.html");
});
app.get('/getNotes', (req, res) => {
    fs.readFile("./data/note.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                message: "파일 읽기 실패"
            });
        }
        res.type("application/json");
        res.send(data);
    });
});
app.post('/saveNote', (req, res) => {
    const newNote = req.body;
    fs.readFile("./data/note.json", 'utf-8', (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: "파일 읽기 실패"
            });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        const notesStr = JSON.stringify(notes);
        fs.writeFile("./data/note.json", notesStr, 'utf-8', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('파일 저장 실패');
            }
            res.send(notesStr);
        });
    });
});
app.listen(app.get("port"), "0.0.0.0", () => {
    console.log("Express server running at" + app.get("port") + app.get("host"));
});
/*
get방식 -> query
post방식 -> body
*/