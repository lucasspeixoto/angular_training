const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty')

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//O cors vai permitir a comunicação entre o server node com o Angular
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))

const multipartyMiddleware = multiparty({ uploadDir: './uploads' })
app.post('/upload', multipartyMiddleware, (req, res) => {
    const files = req.files
    console.log(files)
    res.json({ message: files })
})

app.use((err, req, res, next) => res.json({ error: err.message }))

app.listen(8000, () => {
    console.log('Servidor porta 8000')
})