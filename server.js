'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT ||3000;

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

app.get('new_profile/validate', (req, res) => {
  client.query('SELECT username FROM tablename WHERE username=$1', [req.body.username]).then(result => {
    res.body.available = result.rows.length === 0 ?  false : true;
  }).catch(err => console.log(err));
});

app.post('new_profile', (req, res) => {
  client.query('INSERT INTO table(values) VALUES(...) ON CONFLICT DO NOTHING', [], (err) => {
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
