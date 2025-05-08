const express = require('express')
const router = express.Router()
const bookService = require('../service')
const uploadBooksMiddleware  = require('../middleware/uploadBooksMiddleware')

router.post('/api/user/login', bookService.createUser)

router.get('/api/books/getCreate', bookService.getCreateBooks)
router.post('/api/books/create', bookService.createBooks)

router.get('/api/books', bookService.getAllBooks)
router.get('/api/books/:id', bookService.getBooksByID)

router.put('/api/books/:id/update', bookService.updateBooks)

router.post('/api/books/:id/delete', bookService.deleteBooks)

router.get('/api/books/:id/download', bookService.downloadBooks)

module.exports = router;