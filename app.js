const express = require("express");
const app = express();
const fs = require("fs");


app.set("view engine", "ejs");

app.get("/", (req, res) => {

    fs.readdir("uploads", (err, files) => {
        if (err) {
            console.log(err);
        }
        const notes = []

        for (const file of files) {
            const description = fs.readFileSync(`uploads/${file}`, "utf-8")

            notes.push({
                title: file,
                description: description
            })
        }
        res.render("index", { notes });
    })
});

app.get("/create", (req, res) => {
    res.render("create");
})

app.get('/create-note', (req, res) => {
    console.log(req.query);

    fs.writeFile(`uploads/${req.query.title}.txt`, req.query.description, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    })


})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


