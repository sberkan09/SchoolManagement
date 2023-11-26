const bp = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./database");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Ogrencileri getir
//TC_NOsuna gore ogrencileri getir
app.get("/api/ogrenci/ogrencileriGetir", (req, res) => {
  const { TC_NO } = req.query;
  if (TC_NO == undefined) {
    db.query("select * from ogrenci;")
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/ogrenci/ogrencileriGetir", error));
  } else {
    db.query(`select * from ogrenci where TC_NO = '${TC_NO}';`)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/ogrenci/ogrencileriGetir = '${TC_NO}'`, error)
      );
  }
});

//Aktif ogrencileri getir
//TC_NOsuna gore aktif ogrencileri doner
app.get("/api/ogrenci/aktifOgrencileriGetir", (req, res) => {
  const { TC_NO } = req.query;
  if ((TC_NO = undefined)) {
    db.query(
      "select * from aktif as a left outer join ogrenci as ogr on (a.TC_NO = ogr.TC_NO);"
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error("/api/ogrenci/aktifOgrencileriGetir", error)
      );
  } else {
    db.query(
      `select * from aktif as a left outer join ogrenci as ogr on (a.TC_NO = ogr.TC_NO) where TC_NO = '${TC_NO}';`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/ogrenci/aktifOgrencileriGetir = '${TC_NO}'`, error)
      );
  }
});

//Mezunlari getir
//TC_NOsuna gore mezun ogrencileri doner
app.get("/api/ogrenci/mezunOgrencileriGetir", (req, res) => {
  const { TC_NO } = req.query;
  if ((TC_NO = undefined)) {
    db.query(
      "select * from mezun as m left outer join ogrenci as ogr on (a.TC_NO = m.TC_NO);"
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error("/api/ogrenci/mezunOgrencileriGetir", error)
      );
  } else {
    db.query(
      `select * from mezun as m left outer join ogrenci as ogr on (a.TC_NO = m.TC_NO) where TC_NO = '${TC_NO}';`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/ogrenci/mezunOgrencileriGetir = '${TC_NO}'`, error)
      );
  }
});

// tum calisanlari doner
//TC_NOsuna gore calisanlari doner
app.get("/api/calisan/calisanlariGetir", (req, res) => {
  const { TC_NO } = req.query;
  if ((TC_NO = undefined)) {
    db.query("select * from calisan;")
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/calisan/calisanlariGetir", error));
  } else {
    db.query(`select * from calisan where TC_NO = '${TC_NO}';`)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/calisan/calisanGetir = '${TC_NO}'`, error)
      );
  }
});














app.listen(3306, () => {
  console.log("this is develop branch");
});
