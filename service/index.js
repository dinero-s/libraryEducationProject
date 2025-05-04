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
    'books': [
        {
            "id": uuid(),
            "title": "You Don't Know JS",
            "description": "A series of books diving deep into the core mechanisms of the JavaScript language.",
            "authors": "Kyle Simpson",
            "favourite": true,
            "fileCover": "ydkjs-cover.jpg",
            "fileName": "you-dont-know-js.pdf"
        },
        {
            "id": uuid(),
            "title": "Fluent Python",
            "description": "Takes you through Python’s core language features and libraries to write effective code.",
            "authors": "Luciano Ramalho",
            "favourite": true,
            "fileCover": "fluent-python-cover.jpg",
            "fileName": "fluent-python.pdf"
        },
        {
            "id": uuid(),
            "title": "Introduction to Algorithms",
            "description": "The leading textbook on algorithms, widely used in universities.",
            "authors": "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
            "favourite": false,
            "fileCover": "algorithms-cover.jpg",
            "fileName": "introduction-to-algorithms.pdf"
        }
    ]
}

const createUser = async (req, res) => {
    res.status(201)
    res.json({id: 1, mail: "test@mail.ru"})
}

const createBooks = async (req, res) => {
    const {books} = library

    try {
        const {title, description, authors, favourite, fileCover, fileName} = req.body

        const newLib = new Lib(uuid(), title, description, authors, favourite, fileCover, fileName)
        books.push(newLib)

        res.status(201)
        res.json(newLib)
    } catch (error) {
        console.error(error)
    }
}

const getAllBooks = async (req, res) => {
    const {books} = library
    try {
        res.json(books)
    } catch (error) {
        console.error(error)
    }
}

const getBooksByID = async (req, res) => {
    const {id} = req.params
    try {
        const {books} = library
        const indx = books.findIndex(el => el.id === id)

        if (indx !== -1) {
            res.json(books[indx])
        } else {
            res.status(404)
            res.json('404 | Страница не найдена')
        }
    } catch (error) {
        console.error(error)
    }
}

const updateBooks = async (req, res) => {
    const {books} = library
    try {
        const {title, description} = req.body
        const {id} = req.params
        const indx = books.findIndex(el => el.id === id)

        if (indx !== -1){
            books[indx] = {
                ...books[indx],
                title,
                description,
            }
            res.json(books[indx])
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteBooks = async (req, res) => {
    const {books} = library
    try {
        const {id} = req.params
        const indx = books.findIndex(el => el.id === id)
        const book = books[indx]

        if(indx !== -1){
            books.splice(indx, 1)
            res.json(`Book ${book.title} deleted`)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createUser,
    createBooks,
    getAllBooks,
    getBooksByID,
    updateBooks,
    deleteBooks
}