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
  if (TC_NO == undefined) {
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
  if (TC_NO == undefined) {
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

//Yeni Ogrenci ekle
app.get("/api/ogrenci/aktifOgrenciEkle", (req, res) => {
  const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA } = req.query;
  if (TC_NO == undefined) {
    db.query(
      `insert into ogrenci values('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}')`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/ogrenci/aktifOgrenciEkle = '${TC_NO}'`, error)
      );
  }
});

// Ogrenciyi mezun et
app.get("/api/ogrenci/mezunEt", (req, res) => {
  const { TC_NO } = req.query;

  if (TC_NO !== undefined) {
    db.query(`SELECT * FROM ogrenci WHERE TC_NO = '${TC_NO}'`)
      .then((result) => {
        const { ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA } = result[0];

        // Mezun tablosuna ekle
        return db.query(
          `INSERT INTO mezun VALUES('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}')`
        );
      })
      .then(() => {
        // Aktif tablosundan sil
        return db.query(`DELETE FROM aktif WHERE TC_NO = '${TC_NO}'`);
      })
      .then(() => {
        res.json({ success: true, message: "Ogrenci mezun edildi." });
      })
      .catch((error) => {
        console.error(`/api/ogrenci/mezunEt TC_NO='${TC_NO}'`, error);
        res.status(500).json({ success: false, error: "Bir hata oluştu." });
      });
  } else {
    res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
  }
});

//Ogrenci sil
app.get("/api/ogrenci/aktifOgrenciSil", (req, res) => {
  const { TC_NO } = req.query;

  if (TC_NO !== undefined) {
    db.query(`DELETE FROM ogrenci WHERE TC_NO = '${TC_NO}'`)
      .then(() => {
        res.json({ success: true, message: "Ogrenci veritabanindan silindi." });
      })
      .catch((error) => {
        console.error(`/api/ogrenci/aktifOgrenciSil TC_NO='${TC_NO}'`, error);
        res.status(500).json({ success: false, error: "Bir hata oluştu." });
      });
  } else {
    res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
  }
});

// tum calisanlari doner
//TC_NOsuna gore calisanlari doner
app.get("/api/calisan/calisanlariGetir", (req, res) => {
  const { TC_NO } = req.query;
  if (TC_NO == undefined) {
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

//idarecileri getir
app.get("/api/calisan/idareciGetir", (req, res) => {
  const { TC_NO } = req.query;
  if (TC_NO == undefined) {
    db.query(
      "select * from idari as i left outer join calisan as c on (i.TC_NO = c.TC_NO)"
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/calisan/idareciGetir", error));
  } else {
    db.query(
      `select * from idari as i left outer join calisan as c on (i.TC_NO = c.TC_NO) where TC_NO = '${TC_NO}';`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/calisan/idareciGetir = '${TC_NO}'`, error)
      );
  }
});

//ogretmenleri getir
app.get("/api/calisan/ogretmenGetir", (req, res) => {
  const { TC_NO, PART_MI } = req.query;

  if (TC_NO === undefined) {
    let query = `SELECT *, CASE WHEN o.PART_MI = 1 THEN "Part-Time" ELSE "Full-Time" END AS PART_MI FROM ogretmen AS o LEFT OUTER JOIN calisan AS c ON o.TC_NO = c.TC_NO`;

    if (PART_MI === "1") {
      // Part-time çalışanlar
      query += ` WHERE o.PART_MI = 1`;
    } else if (PART_MI === "0") {
      // Full-time çalışanlar
      query += ` WHERE o.PART_MI = 0`;
    } else {
      //tum ogretmenler
      query;
    }

    db.query(query)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => {
        console.error("/api/calisan/ogretmenGetir", error);
        res.status(500).json({ error: "Veritabani hatasi" });
      });
  } else {
    db.query(
      `SELECT * FROM ogretmen AS o LEFT OUTER JOIN calisan AS c ON o.TC_NO = c.TC_NO WHERE o.TC_NO = '${TC_NO}'`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => {
        console.error(`/api/calisan/ogretmenGetir = '${TC_NO}'`, error);
        res.status(500).json({ error: "Veritabani hatasi" });
      });
  }
});

//temizlik personellerini getir
app.get("/api/calisan/temizlikGetir", (req, res) => {
  const { TC_NO } = req.query;
  if (TC_NO == undefined) {
    db.query(
      "select * from temizlikci as t left outer join calisan as c on (t.TC_NO = c.TC_NO)"
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/calisan/temizlikGetir", error));
  } else {
    db.query(
      `select * from temizlikci as t left outer join calisan as c on (t.TC_NO = c.TC_NO) where TC_NO = '${TC_NO}';`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/calisan/temizlikGetir = '${TC_NO}'`, error)
      );
  }
});

//Ogrenci TC_NOya gore velilerini getir
app.get("/api/veli/veliGetir", (req, res) => {
  const { TC_NO } = req.query;
  if (TC_NO == undefined) {
    db.query(
      "create view Veliler as select v.TC_NO, a.OTC_NO, v.ISIM, v.SOYISIM, v.ADRES, v.TEL_NO, v.E_POSTA, a.YAKINLIK from veli as v left join aile_iliskisi as a on (v.TC_NO = a.VTC_NO)"
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/veli/veliGetir", error));
  } else {
    db.query(
      `select v.TC_NO, a.OTC_NO, v.ISIM, v.SOYISIM, v.ADRES, v.TEL_NO, v.E_POSTA, a.YAKINLIK from veli as v left join aile_iliskisi as a on (v.TC_NO = a.VTC_NO) where TC_NO = '${TC_NO}';`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(
          `/api/veli/veliGetir => ogrenci TC_NO = '${TC_NO}'`,
          error
        )
      );
  }
});

//sube ogrencilerinin velilerini getirir
app.get("/api/veli/subeVeliGetir", (req, res) => {
  const { SUBE_ID } = req.query;
  db.query(
    `create view SubeVeliler as select v.TC_NO, ai.OTC_NO, v.ISIM, v.SOYISIM, v.ADRES, v.TEL_NO, v.E_POSTA, ai.YAKINLIK 
      from ((ogrenci_katilir ok left outer join ogrenci o on (ok.TC_NO  = o.TC_NO)) left outer join aile_iliskisi ai on (o.TC_NO = ai.OTC_NO)) 
      left outer join veli v on (ai.VTC_NO = v.TC_NO) where ok.SUBE_ID = '${SUBE_ID}'`
  )
    .then((data) => {
      res.json(data[0]);
    })
    .catch((error) => console.error("/api/veli/subeVeliGetir", error));
});

//Tum derslerin taleplerini getirir
//Ders adi verilen dersin talebini getirir.
app.get("/api/ders/talepGetir", (req, res) => {
  const { DERS_ADI } = req.query;
  if (DERS_ADI == undefined) {
    db.query(
      //Tum derslerin taleplerini getir
      `select Ders_ADI, Count(DERS_ID) as "Talep"
      from talep t left outer join ders d on (t.DERS_ID = d.DERS_ID)
      group by d.DERS_ADI
      order by Count(DERS_ID) desc `
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/ders/talepGetir", error));
  } else {
    //Adi verilen dersin talebini getir
    db.query(
      `select Ders_ADI, Count(DERS_ID) as "Talep"
      from talep t left outer join ders d on (t.DERS_ID = d.DERS_ID)
      where d.DERS_ID in (select DERS_ID
                           from ders
                           where DERS_ADI = '${DERS_ADI}')
      group by d.DERS_ADI
      order by Count(DERS_ID) desc `
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/ders/talepGetir = '${DERS_ADI}'`, error)
      );
  }
});

//sabit giderleri getir
app.get("/api/gider/sabitGiderGetir", (req, res) => {
  const { GIDER_SABIT_MI } = req.query;
  if (GIDER_SABIT_MI == "1") {
    db.query(`select * gider where GIDER_SABIT_MI = 1;`)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/gider/sabitGiderGetir", error));
  } else {
    console.error(`/api/gider/sabitGiderGetir => Sabit Gider Yok!`, error);
  }
});

//sabit gider ekle
app.get("/api/gider/sabitGiderEkle", (req, res) => {
  const {
    GIDER_ID,
    GIDER_ADI,
    GIDER_TUTAR,
    GIDER_TARIH,
    GIDER_SABIT_MI,
  } = req.query;
  if (GIDER_SABIT_MI == "1") {
    db.query(
      `insert into gider values('${GIDER_ID}', '${GIDER_ADI}', '${GIDER_TUTAR}', '${GIDER_TARIH}', '${GIDER_SABIT_MI}')`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/gider/sabitGiderEkle = '${GIDER_ID}'`, error)
      );
  } else {
    console.error(
      `/api/gider/sabitGiderEkle = '${GIDER_ID}' sabit gider degil.`,
      error
    );
  }
});

//degisken giderleri getir
app.get("/api/gider/degiskenGiderGetir", (req, res) => {
  const { GIDER_SABIT_MI } = req.query;
  if (GIDER_SABIT_MI == "0") {
    db.query(`select * gider where GIDER_SABIT_MI = 0;`)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/gider/degiskenGiderGetir", error));
  } else {
    console.error(
      `/api/gider/degiskenGiderGetir => Degisken Gider Yok!`,
      error
    );
  }
});

//degisken gider ekle
app.get("/api/gider/degiskenGiderEkle", (req, res) => {
  const {
    GIDER_ID,
    GIDER_ADI,
    GIDER_TUTAR,
    GIDER_TARIH,
    GIDER_SABIT_MI,
  } = req.query;
  if (GIDER_SABIT_MI == "0") {
    db.query(
      `insert into gider values('${GIDER_ID}', '${GIDER_ADI}', '${GIDER_TUTAR}', '${GIDER_TARIH}', '${GIDER_SABIT_MI}')`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(`/api/gider/degiskenGiderEkle = '${GIDER_ID}'`, error)
      );
  } else {
    console.error(
      `/api/gider/degiskenGiderEkle = '${GIDER_ID}' sabit gider degil.`,
      error
    );
  }
});

//sube malzeme listelerini getir
app.get("/api/malzeme/subeMalzemeGetir", (req, res) => {
  const { SUBE_ID } = req.query;
  if (SUBE_ID == undefined) {
    db.query(
      `SELECT mk.SUBE_ID, mk.MALZEME_ID, m.MALZEME_ADI, m.STOK, m.MALZEME_BIRIM
            FROM malzeme_kullanimi mk LEFT OUTER JOIN malzeme m ON (mk.MALZEME_ID = m.MALZEME_ID)`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) => console.error("/api/malzeme/subeMalzemeGetir", error));
  } else {
    db.query(
      `SELECT mk.SUBE_ID, mk.MALZEME_ID, m.MALZEME_ADI, m.STOK, m.MALZEME_BIRIM
            FROM malzeme_kullanimi mk LEFT OUTER JOIN malzeme m ON (mk.MALZEME_ID = m.MALZEME_ID)
            WHERE mk.SUBE_ID = '${SUBE_ID}'`
    )
      .then((data) => {
        res.json(data[0]);
      })
      .catch((error) =>
        console.error(
          `/api/malzeme/subeMalzemeGetir => '${SUBE_ID}' subesi icin malzeme bulunamadi!`, error)
      );
  }
});

app.listen(3306, () => {
  console.log("this is develop branch");
});