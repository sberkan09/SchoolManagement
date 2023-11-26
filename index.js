const bp = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// tum ogrencileri doner
app.get('/api/ogrenci/ogrencileriGetir', (req, res) => {
  db.query( 
    'select * from ogrenci;', 
  ).then((data) => {
    res.json(data[0]);
    console.log("------HELLO-------");
    console.log(data[0][0]);
  }).catch(error => console.error("/api/ogrenci/ogrencileriGetir", error));
});

  //api/ogrenci/ogrenci&TC_NO=1 | TC_NO = 1 NOLCAK NOLCAK
  app.get('/api/ogrenci/ogrenci&TC_NO = 1 | TC_NO = 1', (req, res) => {
    const {TC_NO} = req.query;
    db.query( 
    `select * from ogrenci where TC_NO = '${TC_NO};'`, 
    ).then((data) => {
      res.json(data); 
    }).catch(error => console.error("/api/ogrenci/ogrenci&TC_NO = '${TC_NO};' | TC_NO = '${TC_NO};'", error));
  });

  
  //Aktif ogrencileri getir
  app.get('/api/ogrenci/aktifOgrencileriGetir', (req, res) => {
    db.query( 
      'select * from aktif as a left outer join ogrenci as ogr on (a.TC_NO = ogr.TC_NO);', 
    ).then((data) => {
      res.json(data[0]);
    }).catch(error => console.error("/api/ogrenci/aktifOgrencileriGetir", error));
  });


  //Mezunlari getir
  app.get('/api/ogrenci/mezunOgrencileriGetir', (req, res) => {
    db.query( 
      'select * from mezun as m left outer join ogrenci as ogr on (a.TC_NO = m.TC_NO);', 
    ).then((data) => {
      res.json(data); 
    }).catch(error => console.error("/api/ogrenci/mezunOgrencileriGetir", error));
  });









  app.listen(3306, () => {
      console.log('this is develop branch');
    });

  