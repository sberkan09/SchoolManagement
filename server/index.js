const bp = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./database");
var cors = require("cors");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

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
			"select * from mezun as m left outer join ogrenci as ogr on (ogr.TC_NO = m.TC_NO);"
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
	if (TC_NO !== undefined) {
		db.query(
			`insert into ogrenci values('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}');
       insert into aktif values('${TC_NO}');`
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

//api/ogrenci/filtre
app.get("/api/ogrenci/filtre", (req, res) => {
	const { TC_NO, ISIM, SOYISIM, LOW, UP } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`SELECT * FROM ogrenci
       WHERE TC_NO = '${TC_NO}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/ogrenci/filtre TC_NO='${TC_NO}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (ISIM !== undefined) {
		db.query(
			`SELECT * FROM ogrenci
       WHERE ISIM = '${ISIM}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/ogrenci/filtre ISIM='${ISIM}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (SOYISIM !== undefined) {
		db.query(
			`SELECT * FROM ogrenci
       WHERE SOYISIM = '${SOYISIM}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/ogrenci/filtre SOYISIM='${SOYISIM}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (LOW !== undefined && UP == undefined) {
		db.query(
			`SELECT * FROM ogrenci
       WHERE YEAR(CURDATE()) - YEAR(DOGUM_YILI) < '${UP}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/ogrenci/filtre UP='${UP}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (UP !== undefined && LOW == undefined) {
		db.query(
			`SELECT * FROM ogrenci
       WHERE YEAR(CURDATE()) - YEAR(DOGUM_YILI) > '${LOW}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/ogrenci/filtre LOW='${LOW}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (LOW !== undefined && UP !== undefined) {
		db.query(
			`SELECT * FROM ogrenci
       WHERE YEAR(CURDATE()) - YEAR(DOGUM_YILI) > '${LOW}' AND YEAR(CURDATE()) - YEAR(DOGUM_YILI) < '${UP}' `
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/ogrenci/filtre LOW='${LOW}', UP='${UP}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else {
		res.status(400).json({ success: false, error: "Parametre eksik." });
	}
});

//api/calisan/filtre
app.get("/api/calisan/filtre", (req, res) => {
	const { TC_NO, ISIM, SOYISIM } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`SELECT * FROM calisan
       WHERE TC_NO = '${TC_NO}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/calisan/filtre TC_NO='${TC_NO}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (ISIM !== undefined) {
		db.query(
			`SELECT * FROM calisan
       WHERE ISIM = '${ISIM}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/calisan/filtre ISIM='${ISIM}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else if (SOYISIM !== undefined) {
		db.query(
			`SELECT * FROM calisan
       WHERE SOYISIM = '${SOYISIM}'`
		)
			.then(() => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error(`/api/calisan/filtre SOYISIM='${SOYISIM}'`, error);
				res.status(500).json({ success: false, error: "Bir hata oluştu." });
			});
	} else {
		res.status(400).json({ success: false, error: "Parametre eksik." });
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

//Ogrencilerin musaitliklerini getirir
app.get("/api/ogrenci/ogrenciMusaitlikGetir ", (req, res) => {
	const { TC_NO } = req.query;
	if (TC_NO == undefined) {
		db.query(
			//Tum ogrencilerin musaitliklerini getir
			`SELECT om.TC_NO, om.GUN, om.DERS_NO
       FROM ogrenci_musaitlik om;`
		)
			.then((data) => {
				res.json(data[0]);
				console.log("hello");
			})
			.catch((error) =>
				console.error("/api/ogrenci/ogrenciMusaitlikGetir", error)
			);
	} else {
		db.query(
			//TC_NOsuna gore ogrencinin musaitliklerini getir
			`SELECT om.TC_NO, om.GUN, om.DERS_NO
       FROM ogrenci_musaitlik om
       WHERE o.TC_NO = '${TC_NO}';`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) =>
				console.error(`/api/ogrenci/ogrenciMusaitlikGetir = '${TC_NO}'`, error)
			);
	}
});

//Ogretmenlerin musaitliklerini getirir
app.get("/api/ogretmen/ogretmenMusaitlikGetir ", (req, res) => {
	const { TC_NO } = req.query;
	if (TC_NO == undefined) {
		db.query(
			//Tum ogretmenlerin musaitliklerini getir
			`SELECT pm.TC_NO, pm.GUN, pm.DERS_NO
       FROM part_time_musaitlik pm;`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) =>
				console.error("/api/ogretmen/ogretmenMusaitlikGetir", error)
			);
	} else {
		db.query(
			//TC_NOsuna gore ogretmenlerin musaitliklerini getir
			`SELECT pm.TC_NO, pm.GUN, pm.DERS_NO
       FROM part_time_musaitlik pm;
       WHERE pm.TC_NO = '${TC_NO}';`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) =>
				console.error(
					`/api/ogretmen/ogretmenMusaitlikGetir = '${TC_NO}'`,
					error
				)
			);
	}
});

//Tum derslerin taleplerini getirir
app.get("/api/ders/dersSaatiUygunGetir", (req, res) => {
	const { DERS_ID } = req.query;
	if (DERS_ID !== undefined) {
		db.query(
			//Dersin en cok ortak musait oldugu gun ve ders no
			`SELECT ds.DERS_ID, om.GUN, om.DERS_NO, COUNT(*) AS OrtakMusaitlikSayisi 
      FROM ogrenci_musaitlik om
      JOIN ogrenci_katilir ok ON om.TC_NO = ok.TC_NO
      JOIN ders_sube ds ON ok.SUBE_ID = ds.SUBE_ID
      JOIN part_time_musaitlik ptm ON om.GUN = ptm.GUN AND om.DERS_NO = ptm.DERS_NO
      JOIN ogretmen_ogretir oo ON ptm.TC_NO = oo.TC_NO AND ds.SUBE_ID = oo.SUBE_ID
      WHERE ds.DERS_ID = '${DERS_ID}'
      GROUP BY om.GUN, om.DERS_NO, ds.DERS_ID 
      ORDER BY OrtakMusaitlikSayisi DESC
      LIMIT 1;`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) => console.error("/api/ders/dersSaatiUygunGetir", error));
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
	const { GIDER_ID, GIDER_ADI, GIDER_TUTAR, GIDER_TARIH, GIDER_SABIT_MI } =
		req.query;
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
	const { GIDER_ID, GIDER_ADI, GIDER_TUTAR, GIDER_TARIH, GIDER_SABIT_MI } =
		req.query;
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
					`/api/malzeme/subeMalzemeGetir => '${SUBE_ID}' subesi icin malzeme bulunamadi!`,
					error
				)
			);
	}
});

app.listen(3006, () => {
	console.log("this is develop branch");
});