'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const app = express();
const PORT = process.env.PORT ||3000;

// const connString = 'Whatever';
// const client = new pg.Client(connString);
//
// client.connect();
// client('error', (err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('*', (req, res) =>
res.sendFile('index.html', {root: './public'}));

app.get('/trades', (req, res) => {
  let sqlReq = 'Some shit';

  client.query(sqlReq)
  .then(result => res.send(result.rows))
  .catch(console.error);
});


app.listen(PORT, () => console.log('Server Active!'));
