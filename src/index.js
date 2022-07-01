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

// create account table
app.get('/createaccountstable', (req, res) => {
    // let sql = 'CREATE TABLE accounts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    let sql = `
    CREATE TABLE accounts(
        id BIGINT(19), 
        account_name VARCHAR(255), 
        account_type SMALLINT(5), 
        account_no VARCHAR(20), 
        is_archived TINYINT(3), 
        inserted_at DATETIME, 
        inserted_by VARCHAR(255), 
        updated_at DATETIME, 
        updated_by VARCHAR(255)
    )`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Accounts table created ...');
    });
});

app.get('/createtransactionstable', (req, res) => {
    let sql = `
    CREATE TABLE transactions(
        id INT(10), 
        document_id INT(10), 
        transaction_date Date, 
        description VARCHAR(255)
    )`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Transactions table created ...');
    });
});

app.get('/createledgerstable', (req, res) => {
    let sql = `
    CREATE TABLE ledgers(
        transaction_id INT(10),
        account_id BIGINT(19), 
        entry_type ENUM('buy', 'sell', 'lend', 'borrow'), 
        amount DECIMAL(20, 2), 
        person_id INT(10)
    )`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Ledgers table created ...');
    });
});

app.get('/createdocumentstable', (req, res) => {
    let sql = `
    CREATE TABLE documents(
        id INT(10), 
        document_date DATE, 
        document_no VARCHAR(100), 
        description VARCHAR(500), 
        document_comments VARCHAR(4000), 
        internal_comments VARCHAR(500), 
        document_type SMALLINT(5), 
        inserted_at DATETIME, 
        inserted_by VARCHAR(255), 
        upadted_at DATETIME, 
        updated_by VARCHAR(255)
    )`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Documents table created ...');
    });
});



app.listen('3000', () => {
    console.log('Server started on port 3000');
});

