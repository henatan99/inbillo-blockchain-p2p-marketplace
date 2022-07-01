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
app.use(express.json());

// create DB
app.get('/', (req, res) => {
    console.log('Hi there');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE inbillo';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(err);
        res.send('database created ...');
    });
});

app.get('/alterdb', (req, res) => {
    let sql = 'ALTER TABLE `accounts` DROP COLUMN `id BIGINT(19)`';
    let sql2 = 'ALTER TABLE `accounts` ADD COLUMN `id BIGINT(19) NOT NULL AUTO_INCREMENT`';

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });

    db.query(sql2, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
})
// NOT NULL AUTO_INCREMENT

// create user table
app.get('/createuserstable', (req, res) => {
    let sql = `
    CREATE TABLE users(
        id INT(10) NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(255),
        address VARCHAR(255),
        phone VARCHAR(15),
        email VARCHAR(255),
        inactive TINYINT(3),
        PRIMARY KEY(id)
    )`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created ...');
    });
});

//drop account table

app.get('/dropaccountstable', (req, res) => {
    let sql = `
        DROP TABLE accounts
    `
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Accounts table dropper...');
    })
});

// create account table
app.get('/createaccountstable', (req, res) => {
    // let sql = 'CREATE TABLE accounts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    let sql = `
    CREATE TABLE accounts(
        id BIGINT(19) NOT NULL AUTO_INCREMENT,
        account_name VARCHAR(255), 
        account_type SMALLINT(5), 
        account_no VARCHAR(20), 
        is_archived TINYINT(3), 
        inserted_at DATETIME, 
        inserted_by VARCHAR(255), 
        updated_at DATETIME, 
        updated_by VARCHAR(255),
        holder_id INT(10) NOT NULL,
        PRIMARY KEY(id),
        INDEX(account_type),
        CONSTRAINT UC_Account UNIQUE (account_no),
        CONSTRAINT fk_user
        FOREIGN KEY(holder_id)
        REFERENCES users(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
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
        description VARCHAR(255),
        PRIMARY transactions_transaction_date_idx
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
        person_id INT(10),
        PRIMARY ledgers_ledger_entry_type_idx,
        PRIMARY ledger_entries_transaction_id_fk,
        PRIMARY ledger_entries_account_id_fk,
        PRIMARY ledger_entries_person_id_fk
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
        updated_by VARCHAR(255),
        PRIMARY (
            documents_document_date_idx,
            documents_document_type_idx,
    )`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Documents table created ...');
    });
});

//get users

app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results); 
    });
});

// create user

app.post('/users', (req, res) => {
    console.log(req.body);

    let user = {
        user_name: req.body.user_name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        inactive: req.body.inactive,
    };

    console.log(user);

    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, user, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account 1 added...'); 
    });
});


// Get accounts 
app.get('/accounts', (req, res) => {
    let sql = 'SELECT * FROM accounts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results); 
    });
});

// create account 

app.post('/accounts', (req, res) => {
    console.log(req.body);

    let account = {
        account_name: req.body.account_name, 
        account_type: req.body.account_type, 
        account_no: req.body.account_no, 
        is_archived: req.body.is_archived, 
        inserted_at: new Date(Date.now()), 
        inserted_by: req.body.inserted_by, 
        updated_at: new Date(Date.now()), 
        updated_by: req.body.updated_by,
        holder_id: req.body.holder_id
    };

    console.log(account);

    let sql = 'INSERT INTO accounts SET ?';
    let query = db.query(sql, account, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account 1 added...'); 
    });
});

// get account by id

app.get('/accounts/:id', (req, res) => {
    let sql = `SELECT * FROM accounts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result); 
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

