const express = require("express");
const router = express.Router();
const {getCounter, incr} = require("../service");

router.post('/counter/:id/incr', incr)
router.get('/counter/:id', getCounter)



module.exports = router;