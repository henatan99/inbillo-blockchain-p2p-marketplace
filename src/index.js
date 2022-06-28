const express = require('express');
const mysql = require('mysql');

// create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Myreigntour@1',
    database  : 'inbillo'
});

// connect 

db.connect((err) => {
    if(err) {
        console.log(err);
        throw(err);
    }
    console.log('MySql connected...');
});

const app = express();

// create DB
app.get('/', (req, res) => {
    console.log('Hi there');
})

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE inbillo';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(err);
        res.send('database created ...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});