const bp = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./src/db');

const app = express();

// oguz

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// tum ilaclari doner
app.get('/api/ilaclar', (req, res) => {
  db.query(
    'select ilacadi, mg, ilacid from ILAC order by ilacadi ASC',
  ).then((data) => {
    res.json(data[0]);
  });
});

// tum kullanicilari doner
app.get('/api/kullanicilar', (req, res) => {
  const { doktortc } = req.query;
  db.query(`select tcno,ad,soyad from kullanici where tcno != '${doktortc}' order by ad, soyad ASC`).then((data) => {
    res.json(data[0]);
  });
});

// TCNo verilen kullanicinin id'si verilen ilacin gerekli bilgilerini doner
app.get('/kullandigim', (req, res) => {
  const { ilacid, tcno } = req.query;
  db.query(`select I.prospektus, I.ac_tok, I.mg, KU.siklik, Y.yaztarih, I.resim
  from ILAC as I inner join KULLANIR as KU on I.ilacid = KU.ilacid left join YAZAR as Y on Y.ilacid = I.ilacid 
  where I.ilacid = '${ilacid}' and KU.tcno = '${tcno}'`).then((data) => {
    res.json(data[0][0]);
  });
});

// Eger HastaneId verilmediyse
// tum doktorlari doner
// Eger HastaneId verildiyse
// O hastanede calisan doktorlari doner
app.get('/api/doktorlar', (req, res) => {
  const { hastaneid } = req.query;
  if (hastaneid === undefined) {
    db.query(
      'select * from DOKTOR as D, KULLANICI as K where D.tcno = K.tcno',
    ).then((data) => {
      res.json(data[0]);
    });
  } else {
    db.query(
      `select K.ad as doktorad, K.soyad as doktorsoyad, D.tcno 
      From DOKTOR as D,KULLANICI as K 
      where D.hastaneid = '${hastaneid}' and D.tcno=K.tcno order by doktorad, doktorsoyad ASC;
      `,
    ).then((data) => {
      res.json(data[0]);
    });
  }
});

// tum asilari doner
app.get('/api/asilar', (req, res) => {
  db.query(
    'select asiid, asiadi from ASI order by asiadi ASC',
  ).then((data) => {
    res.json(data[0]);
  });
});

// tum hastaneleri doner
app.get('/api/hastaneler', (req, res) => {
  db.query(
    'select hastanead, hastaneid from HASTANE order by hastanead ASC',
  ).then((data) => {
    res.json(data[0]);
  });
});

// body'de TCsi verilen kullanicinin ilaclarinin doner
app.get('/ilaclarim', (req, res) => {
  const { tcno } = req.query;
  db.query(
    `select I.ilacadi, I.mg, I.resim, I.prospektus, K.kullanmasayisi, K.siklik, U.tcno, I.ilacid
    from KULLANICI as U, KULLANIR as K, ILAC as I 
    where U.tcno='${tcno}' and K.tcno = U.tcno and K.ilacid = I.ilacid
    `,
  ).then((data) => {
    res.json(data[0]);
  });
});

// body'de TCsi verilen kullanicinin asilarini doner
app.get('/asilarim', (req, res) => {
  const { tcno } = req.query;
  db.query(
    `select S.asiadi, S.yapilmayasi, Y.yapilacagitarih, S.asiid, Y.yaptirdi_mi
    from KULLANICI as K, ASI as S, YAPTIRIR as Y 
    where K.tcno = '${tcno}' and K.tcno = Y.tcno and Y.asiid = S.asiid order by Y.yaptirdi_mi ASC`,
  ).then((data) => {
    res.json(data[0]);
  });
});

// body'de TCsi verilen kullanicinin randevularini doner
app.get('/randevularim', (req, res) => {
  const { tcno } = req.query;
  db.query(
    `select K.ad, DK.ad as doktorad, DK.soyad as doktorsoyad, R.tarih, R.randevuadi, H.hastanead, R.gitti_mi, R.saat, D.tcno as doktortc 
    from HASTANE as H, RANDEVU as R,KULLANICI as K, DOKTOR as D, KULLANICI as DK 
    where K.tcno = '${tcno}' and K.tcno = R.kullanicitc and R.doktortc = D.tcno and D.hastaneid = H.hastaneid and DK.tcno= D.tcno order by R.gitti_mi, R.tarih ASC`,
  ).then((data) => {
    res.json(data[0]);
  });
});

// body'de bilgileri veirlen randevuyu doner
app.get('/randevu', (req, res) => {
  const { kullanicitc, doktortc, tarih, saat } = req.query;
  db.query(`select kullanicitc, doktortc, tarih, saat, randevuadi, gitti_mi 
  from RANDEVU where kullanicitc = '${kullanicitc}' and doktortc = '${doktortc}' and tarih = '${tarih}' and saat = '${saat}:00'`)
    .then((data) => {
      res.json(data[0]);
    });
});

// body'de TCsi verilen kullanicinin profil bilgilerini doner
app.get('/profilim', (req, res) => {
  const { TCNo } = req.body;
  db.query(`select * from KULLANICI as K where K.tcno = '${TCNo}'`).then(
    (data) => {
      res.json(data[0]);
    },
  );
});

// Eger body'de siklik verilmediyse,
// Kullanicinin id'si verilen ilacin kullanim sayisini Body'de verilen deger ile degistirir
// Eger body'de siklik verildiyse,
// Kullaniciya yeni ilac ekler
app.put('/ilaclarim', (req, res) => {
  const { tcno, ilacid, kullanmasayisi, siklik } = req.body;
  if (siklik === undefined) {
    db.query(`update KULLANIR set kullanmasayisi='${kullanmasayisi}' from KULLANICI as U, ILAC as I where U.tcno = '${tcno}' and U.tcno = KULLANIR.tcno and I.ilacid = '${ilacid}' and I.ilacid = KULLANIR.ilacid
  `).then(
      (data) => {
        res.json(data[0]);
      },
    );
  } else {
    db.query(`insert into KULLANIR values('${tcno}','${ilacid}','${siklik}',0)
  `).then(
      (data) => {
        res.json(data[0]);
      },
    );
  }
});

// Body'de tcno, asiid ve yapilacagitarih bilgileri verilen YAPTIRIR tablosu entrysini yaptirdi_mi bilgisiyle gunceller.
app.put('/asilarim', (req, res) => {
  const { tcno, asiid, yapilacagitarih, yaptirdi_mi } = req.body;
  db.query(`update YAPTIRIR set yaptirdi_mi = ${yaptirdi_mi} where tcno = '${tcno}' and asiid = '${asiid}' and yapilacagitarih = '${yapilacagitarih}'`).then(
    (data) => {
      res.json(data[0]);
    },
  );
});

// Body'de tc si verilen kullanicinin yaptirir tablosuna yeni asiyi ekler
app.post('/asilarim', (req, res) => {
  const { tcno, asiid, yapilacagitarih } = req.body;
  db.query(`insert into YAPTIRIR values('${tcno}','${asiid}', '${new Date(yapilacagitarih).toJSON().slice(0, 10)}', 0)
  `).then(
    (data) => {
      res.json(data[0]);
    },
  );
});

// Eger bodyde RandevuIsmi yoksa
// DoktorTC si ve Tarihi verilen randevunun Gittimi degeri bodydeki ile degisir
// Eger bodyde RandevuIsmi varsa
// Verilen TCler tarih ve Randevu ismi ile yeni Randevu olusturulur
app.put('/randevularim', (req, res) => {
  const { kullanicitc, doktortc, tarih, gitti_mi, randevuismi, saat } = req.body;
  if (randevuismi === undefined) {
    db.query(`
    update RANDEVU set gitti_mi='${gitti_mi}' from KULLANICI as U, DOKTOR as D where U.tcno = '${kullanicitc}' and U.tcno = RANDEVU.kullanicitc and D.tcno = RANDEVU.doktortc and RANDEVU.tarih='${tarih}' and RANDEVU.saat='${saat}';
  `).then(
      (data) => {
        res.json(data[0]);
      },
    );
  } else if (randevuismi !== '' && doktortc !== '' && tarih !== '' && saat !== '') {
    const tarih_tomorrow = new Date(new Date(tarih).getTime() + (24 * 60 * 60 * 1000)).toJSON().slice(0, 10);
    db.query(`
    insert into RANDEVU values('${kullanicitc}','${doktortc}','${randevuismi}',0,'${tarih_tomorrow}','${saat}')
    `).then(
      (data) => {
        res.json(data[0]);
      },
    );
  }
});

app.put('/yazar', (req, res) => {
  const { kullanicitc, doktortc, ilacid, yaztarih } = req.body;
  db.query(`insert into YAZAR values('${kullanicitc}', '${doktortc}', '${ilacid}', '${yaztarih}')`).then((data) => {
    res.json(data[0]);
  });
});

// Eger Body'de sifre verilmediyse
// Diger ozellikler bodydeki degerlerle guncellenir
// Eger Body'de sifre verildiyse
// Sifre Bodydeki deger ile guncellenir
app.put('/profilim', (req, res) => {
  const { TCNo, Ad, Soyad, DogumT, Adres, Cinsiyet, Boy, Kilo, Sifre } = req.body;
  if (Sifre === undefined) {
    db.query(`update KULLANICI set ad='${Ad}', soyad='${Soyad}', dogumt='${DogumT}', adres='${Adres}', cinsiyet='${Cinsiyet}', boy='${Boy}', kilo='${Kilo}' where tcno='${TCNo}'`).then(
      (data) => {
        res.json(data[0]);
      },
    );
  } else {
    db.query(`update KULLANICI set sifre='${Sifre}' where tcno='${TCNo}'`).then(
      (data) => {
        res.json(data[0]);
      },
    );
  }
});

// Body'de TCsi verilen kullanicinin ID'si verilen Ilaci silinir
app.delete('/ilaclarim', (req, res) => {
  const { tcno, ilacid } = req.query;
  db.query(`delete From KULLANIR where tcno='${tcno}' and ilacid='${ilacid}'`).then(
    (data) => {
      res.json(data[0]);
    },
  );
});

// Body'de TCsi verilen kullanicinin ID'si verilen asisi silinir
app.delete('/asilarim', (req, res) => {
  const { tcno, asiid } = req.query;
  db.query(`delete from YAPTIRIR where tcno='${tcno}' and asiid='${asiid}'`).then(
    (data) => {
      res.json(data[0]);
    },
  );
});

// Body'de TCsi verilen kullanicinin DoktorTC'si ve Tarihi verilen randevu silinir
app.delete('/randevularim', (req, res) => {
  const { kullanicitc, doktortc, tarih } = req.query;
  db.query(`delete from RANDEVU where kullanicitc='${kullanicitc}' and doktortc='${doktortc}' and tarih='${tarih}'`).then(
    (data) => {
      res.json(data[0]);
    },
  );
});

app.post('/login', (req, res) => {
  const { TCNo, Sifre } = req.body;
  db.query(`select * from KULLANICI where tcno='${TCNo}' and sifre='${Sifre}'`)
    .then((data) => {
      const [result] = data[0];
      if (result !== undefined) {
        const token = jwt.sign({ TCNo, Sifre }, 'secretkey');
        const userObject = { ...result, token, doktor_mu: false };
        db.query(`select * from DOKTOR as D, HASTANE as H where D.tcno='${result.tcno}' and H.hastaneid = D.hastaneid`).then((data2) => {
          const [result2] = data2[0];
          if (result2 !== undefined) {
            userObject.doktor_mu = true;
            userObject.hastanead = result2.hastanead;
          }
          res.json(userObject);
        });
      } else {
        res.status(404).json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(4000, () => {
  console.log('this is develop branch');
});
