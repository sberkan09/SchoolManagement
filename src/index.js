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

//ogrenci ekle
app.get("/api/ogrenci/aktifOgrenciEkle", (req, res) => {
    const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, DOGUM_YILI, VTC_NO, VISIM, VSOYISIM, VADRES, VTEL_NO, VE_POSTA, YAKINLIK } = req.query;

    if (TC_NO && ISIM && SOYISIM && ADRES && TEL_NO && E_POSTA && DOGUM_YILI && VTC_NO && VISIM && VSOYISIM && VADRES && VTEL_NO && VE_POSTA && YAKINLIK) {
        db.transaction().then((transaction) => {
            // Önce TC_NO ile öğrencinin zaten mevcut olup olmadığını kontrol et
            return db.query(`SELECT TC_NO FROM ogrenci WHERE TC_NO = '${TC_NO}';`, { transaction: transaction })
                .then((results) => {
                    // Eğer öğrenci zaten varsa, ekleme işlemi yapma
                    if (results.length > 0) {
                        throw new Error('Öğrenci zaten mevcut.');
                    }
                    // Öğrenci yoksa, ekleme işlemini sürdür
                    return db.query(`INSERT INTO ogrenci (TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, DOGUM_YILI) VALUES ('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}', '${DOGUM_YILI}');`, { transaction: transaction });
                })
                .then(() => {
                    // aktif tablosuna ekle
                    return db.query(`INSERT INTO aktif (TC_NO) VALUES ('${TC_NO}');`, { transaction: transaction });
                })
                .then(() => {
                    // veli tablosuna ekle
                    return db.query(`INSERT INTO veli (TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA) VALUES ('${VTC_NO}', '${VISIM}', '${VSOYISIM}', '${VADRES}', '${VTEL_NO}', '${VE_POSTA}');`, { transaction: transaction });
                })
                .then(() => {
                    // aile ilişkisi tablosuna ekle
                    return db.query(`INSERT INTO aile_iliskisi (OTC_NO, VTC_NO, YAKINLIK) VALUES ('${TC_NO}', '${VTC_NO}', '${YAKINLIK}' );`, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.json({ success: true, message: "Öğrenci ve velisi veritabanına eklendi." });
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/ogrenci/aktifOgrenciEkle TC_NO='${TC_NO}'`, error);
                    res.status(500).json({ success: false, error: "Bir hata oluştu." });
                });
        });

    } else {
        res.status(400).send("Missing or invalid parameters");
    }
});



// Ogrenciyi mezun et
app.get("/api/ogrenci/mezunEt", (req, res) => {
    const { TC_NO, MEZUNIYET_TARIHI } = req.query;

    if (TC_NO && MEZUNIYET_TARIHI) {
        // İşlemleri sırayla gerçekleştirmek için transaction başlat
        db.transaction().then((transaction) => {
            // Mezun tablosuna ekle
            return db.query(
                `INSERT INTO mezun (TC_NO, MEZUNIYET_TARIHI) VALUES ('${TC_NO}', '${MEZUNIYET_TARIHI}')`,
                { transaction: transaction }
            )
            .then(() => {
                // Aktif tablosundan sil
                return db.query(`DELETE FROM aktif WHERE TC_NO = '${TC_NO}'`, { transaction: transaction });
            })
            .then(() => {
                // İşlemleri onayla
                return transaction.commit();
            })
            .then(() => {
                res.json({ success: true, message: "Ogrenci mezun edildi." });
            })
            .catch((error) => {
                // Hata olursa işlemleri geri al
                transaction.rollback();
                console.error("/api/ogrenci/mezunEt TC_NO='" + TC_NO + "'", error);
                res.status(500).json({ success: false, error: "Bir hata oluştu." });
            });
        });
    } else {
        res.status(400).json({
            success: false,
            error: "TC_NO veya MEZUNIYET_TARIHI parametresi eksik.",
        });
    }
});


//Ogrenci sil
app.get("/api/ogrenci/aktifOgrenciSil", (req, res) => {
    const { TC_NO } = req.query;

    if (TC_NO !== undefined) {
        // İşlemi başlat
        db.transaction().then((transaction) => {
            // Önce aktif tablosundan sil
            return db.query(`DELETE FROM aktif WHERE TC_NO = '${TC_NO}'`, { transaction: transaction })
                .then(() => {
                    // Sonra ogrenci tablosundan sil
                    return db.query(`DELETE FROM ogrenci WHERE TC_NO = '${TC_NO}'`, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.json({ success: true, message: "Ogrenci veritabanindan silindi." });
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/ogrenci/aktifOgrenciSil TC_NO='${TC_NO}'`, error);
                    res.status(500).json({ success: false, error: "Bir hata oluştu." });
                });
        });
    } else {
        res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
    }
});


//Ogrenci guncelle
app.get("/api/ogrenci/guncelle", (req, res) => {
	const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, DOGUM_YILI } =
		req.query;

	if (TC_NO !== undefined) {
		db.query(
			`UPDATE ogrenci SET ISIM = '${ISIM}', SOYISIM = '${SOYISIM}', ADRES = '${ADRES}', TEL_NO = '${TEL_NO}', E_POSTA = '${E_POSTA}', DOGUM_YILI = '${DOGUM_YILI}' WHERE TC_NO = '${TC_NO}';`
		)
			.then(() => {
				res.status(200).send("Ogrenci bilgileri başariyla güncellendi");
			})
			.catch((error) => {
				console.error("/api/ogrenci/guncelle", error);
				res
					.status(500)
					.send("Ogrenci bilgileri güncellenirken bir hata oluştu");
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
			.then((data) => {
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
			.then((data) => {
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
			.then((data) => {
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
			.then((data) => {
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
			.then((data) => {
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
			.then((data) => {
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

//api/ogrenci/dersTalepEt
app.get("/api/ogrenci/dersTalepEt", (req, res) => {
    const { TC_NO, DERS_ID } = req.query;

    if (TC_NO && DERS_ID) {
        db.transaction().then((transaction) => {
            // Önce öğrencinin ve dersin varlığını ve dersin aktifliğini kontrol et
            return db.query(`SELECT * FROM ogrenci WHERE TC_NO = '${TC_NO}'`, { transaction: transaction })
                .then(ogrenciResults => {
                    if (ogrenciResults.length === 0) {
                        throw new Error('Ogrenci bulunamadi.');
                    }
                    return db.query(`SELECT * FROM ders WHERE DERS_ID = ${DERS_ID} AND AKTIF_MI = 0`, { transaction: transaction });
                })
                .then(dersResults => {
                    if (dersResults.length === 0) {
                        throw new Error('Aktif ders bulunamadi.');
                    }
                    // Öğrencinin aynı ders için zaten talebi olup olmadığını kontrol et
                    return db.query(`SELECT * FROM talep WHERE TC_NO = '${TC_NO}' AND DERS_ID = ${DERS_ID}`, { transaction: transaction });
                })
                .then(talepResults => {
                    if (talepResults.length > 2) {
						console.log(talepResults);
                        throw new Error('Ogrenci bu ders icin zaten talepte bulunmus.');
                    }
                    // Yeni talebi ekle
                    return db.query(`INSERT INTO talep (TC_NO, DERS_ID) VALUES ('${TC_NO}', ${DERS_ID});`, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.json({ success: true, message: "Ders talebi başariyla olusturuldu." });
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/ogrenci/dersTalepEt TC_NO='${TC_NO}', DERS_ID='${DERS_ID}'`, error);
                    res.status(500).json({ success: false, error: error.message });
                });
        });
    } else {
        res.status(400).send("Eksik veya gecersiz parametreler");
    }
});

//api/ogrenci/MusaitlikEkle
app.get("/api/ogrenci/MusaitlikEkle", (req, res) => {
    const { TC_NO, GUN, DERS_NO } = req.query;
    // GUN ve DERS_NO değerlerinin uygun aralıkta olup olmadığını kontrol et
    if (!TC_NO || !GUN || !DERS_NO || GUN < 1 || GUN > 7 || DERS_NO < 1 || DERS_NO > 10) {
        return res.status(400).send("Parametrelerin degerleri uygun aralikta olmali: GUN 1-7 arasi, DERS_NO 1-10 arasi.");
    }

    // Önce öğrencinin var olup olmadığını kontrol et
    db.query(`SELECT * FROM ogrenci WHERE TC_NO = '${TC_NO}'`)
        .then(ogrenciResults => {
            if (ogrenciResults.length === 0) {
                return res.status(404).json({ success: false, message: "Ogrenci bulunamadi." });
            }
            // Öğrenci varsa, müsaitlik bilgisini ekle
            return db.query(`INSERT INTO ogrenci_musaitlik (TC_NO, GUN, DERS_NO) VALUES ('${TC_NO}', '${GUN}', '${DERS_NO}')`);
        })
        .then(insertResults => {
            res.json({ success: true, message: "Musaitlik bilgisi başariyla eklendi.", insertId: insertResults.insertId });
        })
        .catch(error => {
            console.error(`/api/ogrenci/MusaitlikEkle TC_NO='${TC_NO}'`, error);
            res.status(500).json({ success: false, error: "Bir hata oluştu." });
        });
});

//api/calisan/filtre
app.get("/api/calisan/filtre", (req, res) => {
	const { TC_NO, ISIM, SOYISIM } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`SELECT * FROM calisan
       WHERE TC_NO = '${TC_NO}'`
		)
			.then((data) => {
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
			.then((data) => {
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
			.then((data) => {
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

//idareci ekle
app.get("/api/calisan/idareciEkle", (req, res) => {
    const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, MAAS } = req.query;

    if (TC_NO && ISIM && SOYISIM && ADRES && TEL_NO && E_POSTA && MAAS) {
        // İşlemi başlat
        db.transaction().then((transaction) => {
            // calisan tablosuna ekle
            const query1 = `INSERT INTO calisan (TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA) VALUES ('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}')`;

            return db.query(query1, { transaction: transaction })
                .then(() => {
                    // idari tablosuna ekle
                    const query2 = `INSERT INTO idari (TC_NO) VALUES ('${TC_NO}')`;
                    return db.query(query2, { transaction: transaction });
                })
                .then(() => {
                    // full_timer tablosuna ekle
                    const query3 = `INSERT INTO full_timer (TC_NO, MAAS) VALUES ('${TC_NO}', '${MAAS}')`;
                    return db.query(query3, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.status(200).send("Idareci added successfully");
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/calisan/idareciEkle TC_NO='${TC_NO}'`, error);
                    res.status(500).json({ success: false, error: "Bir hata oluştu." });
                });
        });
    } else {
        res.status(400).json({ success: false, error: "Missing or invalid parameters" });
    }
});


//ogretmenleri getir
app.get("/api/calisan/ogretmenGetir", (req, res) => {
	const { TC_NO, PART_MI } = req.query;

	if (TC_NO == undefined) {
		db.query(
			`SELECT *, CASE WHEN o.PART_MI = 1 THEN "Part-Time" ELSE "Full-Time" END AS PART_MI FROM ogretmen AS o LEFT OUTER JOIN calisan AS c ON o.TC_NO = c.TC_NO`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error("/api/calisan/ogretmenGetir", error);
				res.status(500).send("Ogretmenler getirilemedi.");
			});
	}
	if (PART_MI === "1") {
		//partTimerlar
		db.query(
			`SELECT o.TC_NO, o.PART_MI, c.ISIM, c.SOYISIM, c.ADRES, c.TEL_NO, c.E_POSTA, pt.SAAT, ut.UCRET, pt.SAAT*ut.UCRET as "MAAS"
			CASE WHEN o.PART_MI = 1 THEN "Part-Time" ELSE "Full-Time" END AS PART_MI 
			FROM ((ogretmen o LEFT OUTER JOIN calisan c ON (o.TC_NO = c.TC_NO)) left outer join part_timer pt on (o.TC_NO = pt.TC_NO))
				left outer join ucret_tablosu ut on (pt.SAAT=ut.SAAT)
			WHERE o.PART_MI = 1`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error("/api/calisan/ogretmenGetir", error);
				res.status(500).send("Part time ogretmenler getirilemedi.");
			});
	}
	if (PART_MI === "0") {
		//fullTimerlar
		db.query(
			`SELECT o.TC_NO, o.PART_MI, c.ISIM, c.SOYISIM, c.ADRES, c.TEL_NO, c.E_POSTA, ft.MAAS  
			CASE WHEN o.PART_MI = 1 THEN "Part-Time" ELSE "Full-Time" END AS PART_MI 
			FROM ((ogretmen o LEFT OUTER JOIN calisan c ON (o.TC_NO = c.TC_NO)) left outer join full_timer ft on (o.TC_NO = ft.TC_NO) 
			WHERE o.PART_MI = 0`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) => {
				console.error("/api/calisan/ogretmenGetir", error);
				res.status(500).send("full time ogretmenler getirilemedi.");
			});
	} else if (TC_NO !== undefined) {
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
///api/calisan/fullTime/ogretmenEkle
app.get("/api/calisan/fullTime/OgretmenEkle", (req, res) => {
    const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, MAAS } = req.query;
    const PART_MI = "0"; // Tam zamanlı ogretmenler icin false olarak ayarlanır

    if (TC_NO && ISIM && SOYISIM && ADRES && TEL_NO && E_POSTA && MAAS) {
        // İşlemi başlat
        db.transaction().then((transaction) => {
            // calisan tablosuna ekle
            const query1 = `INSERT INTO calisan (TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA) VALUES ('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}')`;

            return db.query(query1, { transaction: transaction })
                .then(() => {
                    // ogretmen tablosuna ekle
                    const query2 = `INSERT INTO ogretmen (TC_NO, PART_MI) VALUES ('${TC_NO}', '${PART_MI}')`;
                    return db.query(query2, { transaction: transaction });
                })
                .then(() => {
                    // full_timer tablosuna ekle
                    const query3 = `INSERT INTO full_timer (TC_NO, MAAS) VALUES ('${TC_NO}', '${MAAS}')`;
                    return db.query(query3, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.status(200).send("Full-time ogretmen added successfully");
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/calisan/fullTime/OgretmenEkle TC_NO='${TC_NO}'`, error);
                    res.status(500).json({ success: false, error: "Bir hata oluştu." });
                });
        });
    } else {
        res.status(400).json({ success: false, error: "Missing or invalid parameters" });
    }
});


//api/calisan/partTime/ogretmenEkle
app.get("/api/calisan/partTime/OgretmenEkle", (req, res) => {
    const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, SAAT } = req.query;
    const PART_MI = "1"; // Part-time ogretmenler icin true olarak ayarlanır

    if (TC_NO && ISIM && SOYISIM && ADRES && TEL_NO && E_POSTA && SAAT) {
        // İşlemi başlat
        db.transaction().then((transaction) => {
            // calisan tablosuna ekle
            const query1 = `INSERT INTO calisan (TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA) VALUES ('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}')`;

            return db.query(query1, { transaction: transaction })
                .then(() => {
                    // ogretmen tablosuna ekle
                    const query2 = `INSERT INTO ogretmen (TC_NO, PART_MI) VALUES ('${TC_NO}', '${PART_MI}')`;
                    return db.query(query2, { transaction: transaction });
                })
                .then(() => {
                    // part_timer tablosuna ekle
                    const query3 = `INSERT INTO part_timer (TC_NO, SAAT) VALUES ('${TC_NO}', '${SAAT}')`;
                    return db.query(query3, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.status(200).send("Part-time ogretmen added successfully");
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/calisan/partTime/OgretmenEkle TC_NO='${TC_NO}'`, error);
                    res.status(500).json({ success: false, error: "Bir hata oluştu." });
                });
        });
    } else {
        res.status(400).json({ success: false, error: "Missing or invalid parameters" });
    }
});

//api/ogretmen/MusaitlikEkle 
app.get("/api/ogretmen/MusaitlikEkle", (req, res) => {
    const { TC_NO, GUN, DERS_NO } = req.query; // Öğretmenin TC kimlik numarası, müsait olduğu gün ve DERS_NO

    // GUN ve SAATLER'in uygun aralıkta olup olmadığını kontrol et
    if (!TC_NO || !GUN || !DERS_NO || GUN < 1 || GUN > 7 || DERS_NO < 1 || DERS_NO > 10) {
        return res.status(400).send("Parametrelerin degerleri uygun aralikta olmali: GUN 1-7 arasi ve SAATLER tanimli olmali.");
    }

    // Önce öğretmenin var olup olmadığını kontrol et
    db.query(`SELECT * FROM ogretmen WHERE TC_NO = '${TC_NO}'`)
        .then(ogretmenResults => {
            if (ogretmenResults.length === 0) {
                return res.status(404).json({ success: false, message: "Öğretmen bulunamadi." });
            }
            // Öğretmen varsa, müsaitlik bilgisini ekle
            return db.query(`INSERT INTO part_time_musaitlik (TC_NO, GUN, DERS_NO) VALUES ('${TC_NO}', '${GUN}', '${DERS_NO}')`);
        })
        .then(insertResults => {
            res.json({ success: true, message: "Musaitlik bilgisi basariyla eklendi.", insertId: insertResults.insertId });
        })
        .catch(error => {
            console.error(`/api/ogretmen/MusaitlikEkle TC_NO='${TC_NO}'`, error);
            res.status(500).json({ success: false, error: "Bir hata olustu." });
        });
});



//Calisan guncelle
app.get("/api/calisan/guncelle", (req, res) => {
	const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`UPDATE calisan SET ISIM = '${ISIM}', SOYISIM = '${SOYISIM}', ADRES = '${ADRES}', TEL_NO = '${TEL_NO}', E_POSTA = '${E_POSTA}' WHERE TC_NO = '${TC_NO}';`
		)
			.then(() => {
				res.status(200).send("Ogrenci bilgileri başariyla güncellendi");
			})
			.catch((error) => {
				console.error("/api/ogrenci/guncelle", error);
				res
					.status(500)
					.send("Ogrenci bilgileri güncellenirken bir hata oluştu");
			});
	} else {
		res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
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

// api/calisan/temizlikciEkle
app.get("/api/calisan/temizlikciEkle", (req, res) => {
    const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, MAAS } = req.query;

    if (TC_NO && ISIM && SOYISIM && ADRES && TEL_NO && E_POSTA && MAAS) {
        // İşlemi başlat
        db.transaction().then((transaction) => {
            // calisan tablosuna ekle
            const query1 = `INSERT INTO calisan (TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA) VALUES ('${TC_NO}', '${ISIM}', '${SOYISIM}', '${ADRES}', '${TEL_NO}', '${E_POSTA}')`;

            return db.query(query1, { transaction: transaction })
                .then(() => {
                    // temizlikci tablosuna ekle
                    const query2 = `INSERT INTO temizlikci (TC_NO) VALUES ('${TC_NO}')`;
                    return db.query(query2, { transaction: transaction });
                })
                .then(() => {
                    // full_timer tablosuna ekle (eğer temizlikçiler tam zamanlı olarak kabul ediliyorsa)
                    const query3 = `INSERT INTO full_timer (TC_NO, MAAS) VALUES ('${TC_NO}', '${MAAS}')`;
                    return db.query(query3, { transaction: transaction });
                })
                .then(() => {
                    // İşlemi onayla
                    return transaction.commit();
                })
                .then(() => {
                    res.status(200).send("Temizlik personeli added successfully");
                })
                .catch((error) => {
                    // Hata olursa işlemi geri al
                    transaction.rollback();
                    console.error(`/api/calisan/temizlikciEkle TC_NO='${TC_NO}'`, error);
                    res.status(500).json({ success: false, error: "Bir hata oluştu." });
                });
        });
    } else {
        res.status(400).json({ success: false, error: "Missing or invalid parameters" });
    }
});


//Full_timer calisanlarin maaslarin guncelle
app.get("/api/fullTime/guncelle", (req, res) => {
	const { TC_NO, MAAS } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`UPDATE full_timer SET TC_NO = '${TC_NO}', MAAS = '${MAAS}' WHERE TC_NO = '${TC_NO}';`
		)
			.then(() => {
				res.status(200).send("FullTime maas bilgileri başariyla güncellendi");
			})
			.catch((error) => {
				console.error("/api/fullTime/guncelle", error);
				res
					.status(500)
					.send("FullTime maas bilgileri güncellenirken bir hata oluştu");
			});
	} else {
		res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
	}
});

//Part_timer calisanlarin maaslarin guncelle
app.get("/api/partTime/guncelle", (req, res) => {
	const { TC_NO, SAAT } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`UPDATE part_timer SET TC_NO = '${TC_NO}', SAAT = '${SAAT}' WHERE TC_NO = '${TC_NO}';`
		)
			.then(() => {
				res
					.status(200)
					.send("PartTime calisma saati bilgileri başariyla güncellendi");
			})
			.catch((error) => {
				console.error("/api/partTime/guncelle", error);
				res
					.status(500)
					.send("partTime saat bilgileri güncellenirken bir hata oluştu");
			});
	} else {
		res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
	}
});

//Saatlik ucretleri guncelle
app.get("/api/ucret/guncelle", (req, res) => {
	const { SAAT, UCRET } = req.query;

	if (SAAT !== undefined) {
		db.query(
			`UPDATE ucret_tablosu SET SAAT = '${SAAT}', UCRET = '${UCRET}' WHERE SAAT = '${SAAT}';`
		)
			.then(() => {
				res.status(200).send("Saatlik ucret bilgileri başariyla güncellendi");
			})
			.catch((error) => {
				console.error("/api/ucret/guncelle", error);
				res
					.status(500)
					.send("Saatlik ucret bilgileri güncellenirken bir hata oluştu");
			});
	} else {
		res.status(400).json({ success: false, error: "SAAT parametresi eksik." });
	}
});

//Ogrenci TC_NOya gore velilerini getir
app.get("/api/veli/veliGetir", (req, res) => {
	const { TC_NO } = req.query;
	if (TC_NO == undefined) {
		db.query(
			"select v.TC_NO, a.OTC_NO, v.ISIM, v.SOYISIM, v.ADRES, v.TEL_NO, v.E_POSTA, a.YAKINLIK from veli as v left join aile_iliskisi as a on (v.TC_NO = a.VTC_NO)"
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
		`select v.TC_NO, ai.OTC_NO, v.ISIM, v.SOYISIM, v.ADRES, v.TEL_NO, v.E_POSTA, ai.YAKINLIK 
      from ((ogrenci_katilir ok left outer join ogrenci o on (ok.TC_NO  = o.TC_NO)) left outer join aile_iliskisi ai on (o.TC_NO = ai.OTC_NO)) 
      left outer join veli v on (ai.VTC_NO = v.TC_NO) where ok.SUBE_ID = '${SUBE_ID}'`
	)
		.then((data) => {
			res.json(data[0]);
		})
		.catch((error) => console.error("/api/veli/subeVeliGetir", error));
});

//sube ogrencilerini getirir
app.get("/api/sube/ogrencileriGetir", (req, res) => {
	const { SUBE_ID } = req.query;
	db.query(
		`SELECT o.TC_NO, o.ISIM, o.SOYISIM, o.ADRES, o.TEL_NO, o.E_POSTA FROM ogrenci o 
		 JOIN ogrenci_katilir ok ON o.TC_NO = ok.TC_NO WHERE ok.SUBE_ID = '${SUBE_ID}';`
	)
		.then((data) => {
			res.json(data[0]);
		})
		.catch((error) => console.error("/api/sube/ogrencileriGetir", error));
});

//Velilerin ogrencilerini getirir
app.get("/api/veli/ogrencileriGetir", (req, res) => {
	const { TC_NO } = req.query;
	if (TC_NO == undefined) {
		db.query(
			`SELECT  o.TC_NO, o.ISIM, o.SOYISIM, FROM ogrenci o JOIN aile_iliskisi ai ON o.TC_NO = ai.OTC_NO WHERE  ai.VTC_NO = '${TC_NO}';`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) => console.error("/api/veli/ogrencileriGetir", error));
	} else {
		db.query(
			`SELECT v.TC_NO AS VeliTC, v.ISIM AS VeliIsim, v.SOYISIM AS VeliSoyisim, o.TC_NO AS OgrenciTC, o.ISIM AS OgrenciIsim, o.SOYISIM AS OgrenciSoyisim
			 FROM veli v JOIN aile_iliskisi ai ON v.TC_NO = ai.VTC_NO JOIN ogrenci o ON ai.OTC_NO = o.TC_NO ORDER BY v.TC_NO;`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) =>
				console.error(
					`/api/veli/ogrencileriGetir => ogrenci TC_NO = '${TC_NO}'`,
					error
				)
			);
	}
});

//Veli Guncelle
app.get("/api/veli/guncelle", (req, res) => {
	const { TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA } = req.query;

	if (TC_NO !== undefined) {
		db.query(
			`UPDATE veli SET ISIM = '${ISIM}', SOYISIM = '${SOYISIM}', ADRES = '${ADRES}', TEL_NO = '${TEL_NO}', E_POSTA = '${E_POSTA}' WHERE TC_NO = '${TC_NO}';`
		)
			.then(() => {
				res.status(200).send("Veli bilgileri başariyla güncellendi");
			})
			.catch((error) => {
				console.error("/api/veli/guncelle", error);
				res.status(500).send("Veli bilgileri güncellenirken bir hata oluştu");
			});
	} else {
		res.status(400).json({ success: false, error: "TC_NO parametresi eksik." });
	}
});

// /api/ders/tumDersleriGetir
app.get("/api/ders/tumDersleriGetir", (req, res) => {
	db.query(
		//Tum derslerin taleplerini getir
		`select * from ders as d group by d.DERS_ADI;`
	)
		.then((data) => {
			res.json(data[0]);
		})
		.catch((error) => console.error("/api/ders/tumDersleriGetir", error));
});

app.get("/api/ders/subeleriGetir", (req, res) => {
	const { DERS_ID } = req.query;
	if (DERS_ID != undefined) {
		db.query(
			`SELECT s.SUBE_ID, s.GUN, s.DERS_NO, s.SINIF, s.SUBE_NO FROM sube s JOIN ders_sube ds ON s.SUBE_ID = ds.SUBE_ID WHERE ds.DERS_ID = '${DERS_ID}';`
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) => console.error("/api/ders/subeleriGetir", error));
	} else {
		db.query(
			"SELECT s.SUBE_ID, s.GUN, s.DERS_NO, s.SINIF, s.SUBE_NO FROM sube s JOIN ders_sube ds ON s.SUBE_ID = ds.SUBE_ID ORDER BY ds.DERS_ID;"
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((error) =>
				console.error(`/api/ders/subeleriGetir = '${DERS_ID}'`, error)
			);
	}
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

//Ders ekle
app.get("/api/ders/dersEkle", (req, res) => {
    const { DERS_ADI, DERS_SAATI } = req.query;
    const AKTIF_MI = "0"; // Dersin aktif olup olmadığını belirten değişken

    if (DERS_ADI && DERS_SAATI) {
        const query1 = `INSERT INTO ders (DERS_ADI, DERS_SAATI, AKTIF_MI) VALUES ('${DERS_ADI}', '${DERS_SAATI}', '${AKTIF_MI}')`;

        db.query(query1)
            .then(() => {
                res.status(200).send("Ders added successfully");
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error while inserting into ders");
            });
    } else {
        res.status(400).send("Missing or invalid parameters");
    }
});


//Kapali dersleri getir
app.get("/api/ders/kapaliDersGetir", (req, res) => {
    db.query('select * from ders where AKTIF_MI = false;')
        .then((data) => {
            res.json(data[0]);
        })
        .catch((error) => console.error("/api/ders/kapaliDersGetir", error));
});

//Acik dersleri getir
app.get("/api/ders/acikDersGetir", (req, res) => {
    db.query('select * from ders where AKTIF_MI = true;')
        .then((data) => {
            res.json(data[0]);
        })
        .catch((error) => console.error("/api/ders/acikDersGetir", error));
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

//Sube ekle
app.get("/api/sube/subeEkle", (req, res) => {
    const {GUN, DERS_NO, SINIF, SUBE_NO} = req.query;

    if (GUN && DERS_NO && SINIF && SUBE_NO) {
        // İşlemleri sırayla gerçekleştirmek için transaction başlat
        db.transaction().then((transaction) => {
            // Mezun tablosuna ekle
            return db.query(
                `INSERT INTO sube (GUN, DERS_NO, SINIF, SUBE_NO) VALUES ('${GUN}', '${DERS_NO}', '${SINIF}', '${SUBE_NO}')`,
                { transaction: transaction }
            )
            .then(() => {
                // İşlemleri onayla
                return transaction.commit();
            })
            .then(() => {
                res.json({ success: true, message: "Yeni sube eklendi." });
            })
            .catch((error) => {
                // Hata olursa işlemleri geri al
                transaction.rollback();
                console.error("/api/sube/subeEkle'", error);
                res.status(500).json({ success: false, error: "Bir hata oluştu." });
            });
        });
    } else {
        res.status(400).json({
            success: false,
            error: "Parametre eksik veya hatali.",
        });
    }
});

//Ders sube bagla
app.get("/api/ders/subeDersBagla", (req, res) => {
    const {SUBE_ID, DERS_ID} = req.query;

    if (SUBE_ID && DERS_ID) {
        // İşlemleri sırayla gerçekleştirmek için transaction başlat
        db.transaction().then((transaction) => {
            // Mezun tablosuna ekle
            return db.query(
                `INSERT INTO ders_sube (SUBE_ID, DERS_ID) VALUES ('${SUBE_ID}', '${DERS_ID}')`,
                { transaction: transaction }
            )
            .then(() => {
                // İşlemleri onayla
                return transaction.commit();
            })
            .then(() => {
                res.json({ success: true, message: "Yeni ders-sube iliskisi eklendi." });
            })
            .catch((error) => {
                // Hata olursa işlemleri geri al
                transaction.rollback();
                console.error("/api/ders/subeDersBagla ='" + `'${SUBE_ID}'`+ " " + `'${DERS_ID}'`, error);
                res.status(500).json({ success: false, error: "Bir hata oluştu." });
            });
        });
    } else {
        res.status(400).json({
            success: false,
            error: "Parametre eksik veya hatali.",
        });
    }
});

// /api/gider/tumGiderleriGetir
app.get("/api/gider/tumGiderleriGetir", (req, res) => {
	db.query(`SELECT * FROM gider;`)
		.then((data) => {
			res.json(data[0]);
		})
		.catch((error) => console.error("/api/gider/tumGiderleriGetir", error));
});

//sabit giderleri getir
app.get("/api/gider/sabitGiderGetir", (req, res) => {
	const { GIDER_SABIT_MI } = req.query;
	if (GIDER_SABIT_MI == "1") {
		db.query(`select * FROM gider where GIDER_SABIT_MI = 1;`)
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
    const { GIDER_ID, GIDER_ADI, GIDER_TUTAR, GIDER_TARIH, GIDER_SABIT_MI } = req.query;

    if (GIDER_SABIT_MI === "1") {
        db.query(`INSERT INTO gider (GIDER_ID, GIDER_ADI, GIDER_TUTAR, GIDER_TARIH, GIDER_SABIT_MI) VALUES ('${GIDER_ID}', '${GIDER_ADI}', '${GIDER_TUTAR}', '${GIDER_TARIH}', '${GIDER_SABIT_MI}')`)
            .then((data) => {
                res.json({ success: true, message: "Sabit gider başarıyla eklendi." });
            })
            .catch((error) => {
                console.error(`/api/gider/sabitGiderEkle = '${GIDER_ID}'`, error);
                res.status(500).json({ success: false, error: "Bir hata oluştu." });
            });
    } else {
        res.status(400).json({ success: false, error: `Gider ID '${GIDER_ID}' sabit bir gider değil.` });
    }
});

//degisken giderleri getir
app.get("/api/gider/degiskenGiderGetir", (req, res) => {
	const { GIDER_SABIT_MI } = req.query;
	if (GIDER_SABIT_MI == "0") {
		db.query(`select * FROM gider where GIDER_SABIT_MI = 0;`)
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
    const { GIDER_ID, GIDER_ADI, GIDER_TUTAR, GIDER_TARIH, GIDER_SABIT_MI } = req.query;

    if (GIDER_SABIT_MI === "0") {
        db.query(`INSERT INTO gider (GIDER_ID, GIDER_ADI, GIDER_TUTAR, GIDER_TARIH, GIDER_SABIT_MI) VALUES ('${GIDER_ID}', '${GIDER_ADI}', '${GIDER_TUTAR}', '${GIDER_TARIH}', '${GIDER_SABIT_MI}')`)
            .then((data) => {
                res.json({ success: true, message: "Değişken gider başarıyla eklendi." });
            })
            .catch((error) => {
                console.error(`/api/gider/degiskenGiderEkle = '${GIDER_ID}'`, error);
                res.status(500).json({ success: false, error: "Bir hata oluştu." });
            });
    } else {
        res.status(400).json({ success: false, error: `Gider ID '${GIDER_ID}' değişken bir gider değil.` });
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

app.listen(3007, () => {
	console.log("this is develop branch");
});
