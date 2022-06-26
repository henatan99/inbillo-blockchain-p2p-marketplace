const express = require('express');
const mysql = require('mysql');

// create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Myreigntour@1',
    database  : 'inbilo'
});

// connect 

db.connect((err: string) => {
    if(err) {
        console.log(err);
        throw(err);
    }
    console.log('MySql connected...');
});
