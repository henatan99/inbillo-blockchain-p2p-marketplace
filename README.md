## Installation

### Initiaize app with npm 

`npm init -y`

### Typescript and nodemon

`npm install --save-dev ts-node nodemon`

### Express 

`npm install express --save`

Other modules 

- body-parser − This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.

`npm install body-parser --save`

- cookie-parser − Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

`npm install cookie-parser --save`

- multer − This is a node.js middleware for handling multipart/form-data.

`npm install multer --save`

### MySql and Typescript 

[Ref](https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/)

- `npm install --save mysql`
- `npm install --save-dev @types/mysql`

## Configuration

### Add a nodemon.json config.

`{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}`

### scripts in package.json

`"dev": "nodemon"`

## Creating production build

### Insall rimraf

`npm install --save-dev rimraf`

### Add build script in package.json

`"build": "rimraf ./build && tsc"` 

### Producion start script 

`"start": "npm run build && node build/index.js"`

## Usage 

- `npm run dev`    // to run app in development env
- `npm run build`  // to clean build before deploy to  production 
- `npm run start`   // to launch app on production server


## Databse setup 

### Creating a database and user on ubuntu treminal

- `mysql -uroot -p`
- `Enter password:` // Enter root password
- `mysql> CREATE DATABASE inbillo;` // Creat database wth name inbillo
- `mysql> show databases;` // see database created 
- `mysql> CREATE USER 'inbillouser'@'localhost' IDENTIFIED BY 'Myinbillopass@1';`  // create database user (inbillouser) with password 'Myinbillopass@1';
- `mysql> GRANT ALL ON inbillo.* To 'inbillouser'@'localhost' WITH GRANT OPTION;`   // grant db access to user 

### Creating a database and user with db.createDb route

`app.get('/createdb', (req, res) => {
    console.log('creating db...')
    let sql = 'CREATE DATABASE inbillo';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(err);
        res.send('databse created ...');
    });
});`


- But the initial user should be root

`const db = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : 'Myreigntour@1',
    database  : 'inbillo'
});`


## App requirement 

- Context: inBillo is an operator, which delivers functionality of financial liability management. Each inBillo user operates on inBillo market-place in a P2P manner by performing financial operations like buying/selling financial instruments, lending/borrowing money etc.

- Each inBillo user is able to interact with every other inBillo user in a term of performing these financial operations.

- As a result, each action depends on an inbound bank transfer (in a case of borrowing money, selling financial instruments etc.) or outbound money bank transfer (in a case of buying financial instruments, lending own money etc.).

- Each financial operation is logged in the internal inBIllo SQL database as well as on the BlockChain network. At the end of each billing period (i.e. financial day end) bank accounts must be re-balanced, to reflect proper bank account balance for each user, as each user would have an individual bank account.

### Could you please design SQL data structures/schema which:

- ensures ability to manage and log all financial operations made by inBillo users,
- ensures possibility of bank account balancing for all inBillo users,

### Could you design and implement an algorithm please, which ensures proper bank account balance, which is performed after each financial period ends (i.e. at the end of the day)?

As expected, the result of the designed algorithm is a set of direct debit instructions for each inBillo user bank account (each instruction is a pair: destination bank account number and amount). Please do use the above SQL schema as the source of the data for the calculations. Please use TypeScript/NodeJS for this implementation

### Please implement the simplest Solidity smart contract that would model above financial operations, and use any blockchain observing mechanism (like The Graph for example) to populate a SQL database with the financial operations observed on-chain.

## Modeling the entities relationship for the liabilit management 

### Transactions 
- The attributes are id(INT(10)), document_id INT(10), transaction_date(Date), description(VARCHAR(255))
- Indexes: PRIMARY transactions_transaction_date_idx, transactions_document_id_fk

### Accounts 
- The attributes are id(BIGINT(19)), account_name(VARCHAR(255)), account_type(SMALLINT(5)), account_holder, official_code(VARCHAR(20)), is_archived(TINYINT(3)), inserted_at(DATETIME), inserted_by(VARCHAR(255)), updated_at(DATETIME), updated_by(VARCHAR(255))
- Indexes: PRIMARY accounts_account_type_idx, accounts_official_code_idx, account_holder_id_fk

### Ledger entries 
- The attributes are id(INT(10)), transaction_id(INT(10)), account_id(BIGINT(19)), entry_type('buy', 'sell', 'lend', 'borrow' ), amount(DECIMAL(20, 2)), person_id(INT(10))
- Indexes: PRIMARY ledger_entries_entry_type_idx, ledger_entries_transaction_id_fk, ledger_entries_account_id_fk, ledger_entries_person_id_fk

### Documents 
- The attributes are id(INT(10)), document_date(DATE), document_no(VARCHAR(100)), description(VARCHAR(500)), document_comments(VARCHAR(4000)), internal_comments(VARCHAR(500)), document_type(SMALLINT(5)), inserted_at(DATETIME), inserted_by(VARCHAR(255)), upadted_at(DATETIME), updated_by(VARCHAR(255))

