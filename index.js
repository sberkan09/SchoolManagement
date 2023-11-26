const bp = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./src/database');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// tum ilaclari doner
app.get('/api/ogrenci/ogrencileriGetir', (req, res) => {
  db.query( //exception handle
    'select * from ogrenci;', 
  ).then((data) => {
    res.json(data); //data[0] ilk elemani doner
  });
});
app.listen(3306, () => {
    console.log('this is develop branch');
  });