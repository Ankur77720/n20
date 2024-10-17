const express = require('express');
const app = express();
const fs = require('fs');


app.set("view engine", "ejs");



app.get("/", (req, res) => {

    fs.readdir('./notes', (err, data) => {

        /* data = [ 'note1.txt', 'note2.txt' ] */

        res.render("index", { notes: data })
    })

});



app.get('/new', (req, res) => {
    res.render("new")
})

app.get('/new-note', (req, res) => {

    fs.writeFile(`./notes/${req.query.title}.txt`, req.query.description, (err) => {
        res.redirect("/")
    })
})

app.get('/notes/:title', (req, res) => {
    const title = req.params.title

    console.log(title)
    fs.readFile(`./notes/${title}`, "utf-8", (err, data) => {
        res.render("noteDetail", { note: data })
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});