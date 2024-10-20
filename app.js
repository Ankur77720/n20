const express = require('express')
const fs = require('fs')
const app = express()

app.set('view engine', "ejs")


app.get('/', (req, res) => {
    fs.readdir('./notes', (err, files) => {
        console.log(files)
        res.render('index', { files })
    })
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.get('/new-note', (req, res) => {

    const title = req.query.title
    const description = req.query.description

    fs.writeFile(`./notes/${title}.txt`, description, (err) => {
        res.redirect('/')
    })

    /* File create krna, file ke ander data likhna */



})


/* /edit/note1.txt */

app.get('/edit/:title', (req, res) => {
    const title = req.params.title /* note1.txt */
    fs.readFile(`./notes/${title}`, 'utf-8', (err, data) => {
        res.render('edit', {
            title: title,
            description: data
        })
    })
})

app.get('/edit-note/:oldTitle', (req, res) => {
    const oldTitle = req.params.oldTitle
    const title = req.query.title /* note3.txt */
    const description = req.query.description

    fs.rename(`./notes/${oldTitle}`, `./notes/${title}`, (err) => {

        fs.writeFile(`./notes/${title}`, description, (err) => {
            res.redirect('/')
        })

    })

})


/* 
/notes/note1.txt
/notes/note2.txt
 */


app.get('/notes/:title', (req, res) => {

    const title = req.params.title
    console.log(title)
    fs.readFile(`./notes/${title}`, 'utf-8', (err, data) => {
        res.send(data)
    })
})




app.listen(3000, () => {
    console.log('server is running on port 3000')
})