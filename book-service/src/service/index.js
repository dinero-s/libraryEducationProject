const { v4: uuidv4 } = require('uuid');
const path = require('path');
const axios = require('axios');

const library = {
    'books': []
}

const createUser = async (req, res) => {
    res.status(201)
    res.json({id: 1, mail: "test@mail.ru"})
}

const getCreateBooks = async (req, res) => {
    res.render("library/create", {
        title: "Добавить книгу  ",
    });
}

const createBooks = async (req, res) => {
    const {books} = library

    try {
        const {title, description, authors, favourite, fileCover, fileName} = req.body

        if (!req.file) {
            return res.status(400).json({error: 'Файл книги обязателен'});
        }

        const newBook = {
            id: uuidv4(),
            title,
            description,
            authors,
            favourite,
            fileCover,
            fileName,
            fileBook: req.file.filename
        }

        books.push(newBook)

        res.status(201)
        res.redirect(`/books/getAllBooks`);
    } catch (error) {
        console.error(error)
    }
}

const getAllBooks = async (req, res) => {
    const {books} = library
    try {
        res.render("./library/index", {
            title: 'Библиотека',
            currentPath: req.path,
            books: books
        });
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
            axios.post(`http://localhost:3005/counter/${id}/incr`).catch(err => {
                console.error("Ошибка при инкременте счетчика:", err.message);
            })
            axios.get(`http://localhost:3005/counter/${id}/`)
                .then(viewsResponse => {
                    let viewsCount = viewsResponse.data.count;
                    res.render("library/view", {
                        title: "Просмотр",
                        book: {
                            ...books[indx],
                            views: viewsCount
                        },
                    });
                })
                .catch(err => {
                console.error("Ошибка при ответе:", err.message);
            })
        } else {
            res.status(404)
            res.json('404 | Страница не найдена')
        }
    } catch (error) {
        console.error(error)
    }
}

const getUpdateBooks = async (req, res) => {
    try {
        const {books} = library
        const {id} = req.params
        const indx = books.findIndex(el => el.id === id)
        res.render("library/update", {
            title: "Редактировать книгу",
            book: books[indx]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка сервера");
    }
}

const updateBooks = async (req, res) => {
    const {books} = library
    try {
        const {title, description, authors} = req.body
        const {id} = req.params
        const indx = books.findIndex(el => el.id === id)

        if (indx !== -1) {
            books[indx] = {
                ...books[indx],
                title,
                description,
                authors,
            }

            res.redirect(`/books/getAllBooks/`);
        } else {
            res.status(404)
            res.json('404 | Страница не найдена')
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

        if (indx !== -1) {
            books.splice(indx, 1)
            res.redirect(`/books/getAllBooks`);
        } else {
            res.status(404)
            res.redirect('/404')
        }
    } catch (error) {
        console.error(error)
    }
}

const downloadBooks = async (req, res) => {
    try {
        const {books} = library

        const book = books.find(b => b.id === req.params.id);
        const filePath = path.join(__dirname, '../public/books', book.fileBook);

        res.download(filePath, book.fileName, (err) => {
            if (err) {
                console.error('Ошибка скачивания:', err);
                res.status(500).json({ error: 'Ошибка при скачивании файла' });
            }
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getUpdateBooks,
    getCreateBooks,
    createUser,
    createBooks,
    getAllBooks,
    getBooksByID,
    updateBooks,
    deleteBooks,
    downloadBooks,
}
