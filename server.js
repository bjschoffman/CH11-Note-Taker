const express = require('express');
const path = require('path');
const { v4: uuidv4} = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('./helper/fsUtils');

const PORT = process.env.port || 3001;

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json', 'utf8').then((data) => 
    res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
    readAndAppend({id:uuidv4(), ...req.body}, './db/db.json') 
    res.json(req.body)
    
});

app.delete('/api/notes/:id', (req, res) => {
   const noteId = req.params.id;
   readFromFile('./db/db.json', 'utf-8')
   .then((data) => JSON.parse(data))
   .then((json) => {
    const result = json.filter((note) => note.id !==noteId);
    writeToFile('./db/db.json', result);
    res.json();
   });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);


