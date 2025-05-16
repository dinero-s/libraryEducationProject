const express = require('express');
const app = express();
const router = require('./router');

const PORT = process.env.PORT || 3005;

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})