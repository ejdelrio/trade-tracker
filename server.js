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

app.get('*', () => console.log('ok?'));


app.listen(PORT, () => console.log('Server Active!'));
