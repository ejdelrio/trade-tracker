'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const fs = require('fs');
const pg = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT ||3000;
const saltRounds = 10;


const connString = process.env.DB;
const client = new pg.Client(connString);

client.connect();
client.on('error', (err) => console.log(err));

var proxyTwitter = function(request, response) {
  (requestProxy({
    url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + request.params[0],
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
    }
  }))(request, response);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/search/*', proxyTwitter);

app.get('/', (req, res) =>
res.sendFile('index.html', {root: './public'}));

app.get('/validate', (req, res) => {

  client.query('SELECT username FROM tablename WHERE username=$1',
  [req.body.username])
  .then(result => {
    res.body.available = !result.rows.length === 0;
  })
  .catch(err => console.log(err));
});

app.get('/password', (req, res)=> {client.query('SELECT hash FROM tablename WHERE username=$1',
  [req.body.username])
  .then(result => {
    bcrypt.compare(req.password, result.row[0].hash, (err, valid) => {
      res.body.valid  = valid ? result.row[0] : false;
    });
  });
});

app.post('new_profile', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if(err) {
      console.log(err);
    }
    req.body.hash = hash});
  client.query('INSERT INTO table(first, last, email, userName, hash) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
  [req.body.first, req.body.last, req.body.email, req.body.userName, req.body.hash],
  (err) => {
    if(err) {
      console.log(err);
    }
  });
});

// app.get('/trades', (req, res) => {
//   fs.readFile('./public/scripts/models/sampleJSON.json', (err, data) => {
//     res.send(JSON.parse(data.toString()));
//   });
//
//   // client.query(sqlReq)
//   // .then(result => res.send(result.rows))
//   // .catch(console.error);
// });
//
// app.get('/trades/league', (req, res) => {
//   let sqlReq = 'Some more shit';
//
//   client.query(sqlReq)
//   .then(result => res.send(result.rows))
//   .catch(console.error);
// });
//
// app.get('/trades/team', (req, res) => {
//   let sqlReq = 'EVEN MORE SHIT!!!';
//
//   client.query(sqlReq)
//   .then(result => res.send(result.rows))
//   .catch(console.error);
// });


app.listen(PORT, () => console.log('Server Active!'));
