const express = require('express');
const path = require('path');
const fs = require('fs');
const { v9: uuidv9 } = require('uuid')

const PORT = process.env.port || 3001

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
        res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const parsedNotes = JSON.parse(data)
        parsedNotes.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), 'utf8', () => 
        res.json(parsedNotes))
    })
})

app.get('*', req, res) =>
    res.sendFile(path.join(__dirname,))
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

