const express = require('express')
const router = express.Router()
const bookService = require('../service')
const uploadBooksMiddleware  = require('../middleware/uploadBooksMiddleware')

router.post('/api/user/login', bookService.createUser)
router.post('/api/books', uploadBooksMiddleware, bookService.createBooks)
router.get('/api/books', bookService.getAllBooks)
router.get('/api/books/:id', bookService.getBooksByID)
router.put('/api/books/:id', bookService.updateBooks)
router.delete('/api/books/:id', bookService.deleteBooks)

router.get('/api/books/:id/download', bookService.downloadBooks)

module.exports = router;