const express = require('express');
const {v4: uuid} = require('uuid');

class Lib {
    constructor(
        id = uuid(),
        title = '',
        description = '',
        authors = '',
        favourite = '',
        fileCover = '',
        fileName = '') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favourite = favourite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    }
}

const library = {
    'books': []
}

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (req, res) => {

})

app.get('/api/books/:id', (req, res) => {

})

app.post('/api/books', (req, res) => {

})

app.put('/api/books/:id', (req, res) => {

})

app.delete('/api/books/:id', (req, res) => {

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})