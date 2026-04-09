const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

// Połączenie z bazą
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // wpisz swoje hasło
    database: 'sakila'
});

connection.connect(err => {
    if (err) {
        console.log('Błąd:', err);
        return;
    }
    console.log('Połączono z bazą!');
});

// Serwowanie index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint zwracający filmy
app.get('/films', (req, res) => {
    connection.query('SELECT title, description FROM film LIMIT 20', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Serwer działa: http://localhost:3000');
});