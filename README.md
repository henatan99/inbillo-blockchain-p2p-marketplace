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

