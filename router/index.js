const express = require('express')
const router = express.Router()
const libraryService = require('../service')

router.post('/api/user/login', libraryService.createUser)
router.post('/api/books', libraryService.createBooks)
router.get('/api/books', libraryService.getAllBooks)
router.get('/api/books/:id', libraryService.getBooksByID)
router.put('/api/books/:id', libraryService.updateBooks)
router.delete('/api/books/:id', libraryService.deleteBooks)

module.exports = router;