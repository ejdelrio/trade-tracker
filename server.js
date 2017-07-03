'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT ||3000;
const saltRounds = 10;

// const connString = process.env.'I cant remember';
// const client = new pg.Client(connString);
//
// client.connect();
// client('error', (err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res) =>
res.sendFile('index.html', {root: './public'}));

app.get('/validate', (req, res) => {

  client.query('SELECT username FROM tablename WHERE username=$1',
  [req.body.username])
  .then(result => {
    res.body.available = result.rows.length === 0 ?  false : true;
  })
  .catch(err => console.log(err));
});

app.get('/password', (req, res)=> {

  client.query('SELECT hash FROM tablename WHERE username=$1',
  [req.body.username])
  .then(result => {
    result.row[0];
});

app.post('new_profile', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.hash = hash});
  client.query('INSERT INTO table(first, last, email, userName, hash) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
  [req.body.first, req.body.last, req.body.email, req.body.userName, req.body.hash],
  (err) => {
    if(err) {
      console.log(err);
    }
  });
});

app.get('/trades', (req, res) => {
  fs.readFile('./public/scripts/models/sampleJSON.json', (err, data) => {
    res.send(JSON.parse(data.toString()));
  });

  // client.query(sqlReq)
  // .then(result => res.send(result.rows))
  // .catch(console.error);
});

app.get('/trades/league', (req, res) => {
  let sqlReq = 'Some more shit';

  client.query(sqlReq)
  .then(result => res.send(result.rows))
  .catch(console.error);
});

app.get('/trades/team', (req, res) => {
  let sqlReq = 'EVEN MORE SHIT!!!';

  client.query(sqlReq)
  .then(result => res.send(result.rows))
  .catch(console.error);
});


app.listen(PORT, () => console.log('Server Active!'));
