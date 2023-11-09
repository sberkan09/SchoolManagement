create database okul;

use okul;

create table calisan(
TC_NO char(11) not null,
ISIM VARCHAR(25) not null,
SOYISIM VARCHAR(25) not null,
ADRES VARCHAR(100),
TEL_NO VARCHAR(10) not NULL,
E_POSTA VARCHAR(50),
primary key(TC_NO));

create table temizlikci(
TC_NO char(11) not null,
primary KEY(TC_NO),
FOREIGN KEY (TC_NO) REFERENCES calisan(TC_NO)
);

create table ogretmen(
TC_NO char(11) not null,
primary KEY(TC_NO),
FOREIGN KEY (TC_NO) REFERENCES calisan(TC_NO)
);

create table idari(
TC_NO char(11) not null,
primary KEY(TC_NO),
FOREIGN KEY (TC_NO) REFERENCES calisan(TC_NO)
);


create table full_timer(
TC_NO char(11) not null,
MAAS int not null,
primary KEY(TC_NO),
FOREIGN KEY (TC_NO) REFERENCES calisan(TC_NO)
);

create table ucret_tablosu(
SAAT int not null,
UCRET int not null,
PRIMARY KEY (SAAT)
);

create table part_timer(
TC_NO char(11) not null,
SAAT int not null,
primary KEY(TC_NO),
FOREIGN KEY (TC_NO) REFERENCES calisan(TC_NO),
FOREIGN KEY (SAAT) REFERENCES ucret_tablosu(SAAT)
);

create table part_time_musaitlik(
TC_NO char(11) not null,
MUSAITLIK_ID int not null auto_increment,
GUN int not null,
DERS_NO int not null,
PRIMARY KEY (MUSAITLIK_ID),
foreign key(TC_NO) references part_timer(TC_NO)
);

create table ogrenci(
TC_NO char(11) not null,
ISIM VARCHAR(25) not null,
SOYISIM VARCHAR(25) not null,
ADRES VARCHAR(100),
TEL_NO VARCHAR(10) not NULL,
E_POSTA VARCHAR(50),
PRIMARY KEY (TC_NO)
);

create table veli(
TC_NO char(11) not null,
ISIM VARCHAR(25) not null,
SOYISIM VARCHAR(25) not null,
ADRES VARCHAR(100),
TEL_NO VARCHAR(10) not NULL,
E_POSTA VARCHAR(50),
PRIMARY KEY (TC_NO)
);

create table aile_iliskisi(
VTC_NO char(11) not null,
OTC_NO char(11) not null,
YAKINLIK VARCHAR(20) not null,
PRIMARY KEY (VTC_NO, OTC_NO),
foreign key(VTC_NO) references veli(TC_NO),
foreign key(OTC_NO) references ogrenci(TC_NO)
);

create table ogrenci_musaitlik(
TC_NO char(11) not null,
MUSAITLIK_ID int not null auto_increment,
GUN int not null,
DERS_NO int not null,
PRIMARY KEY (MUSAITLIK_ID),
foreign key(TC_NO) references ogrenci(TC_NO)
);

create table aktif(
TC_NO char(11) not null,
PRIMARY KEY (TC_NO),
foreign key(TC_NO) references ogrenci(TC_NO)
);

create table mezun(
TC_NO char(11) not null,
MEZUNIYET_TARIHI date not null,
PRIMARY KEY (TC_NO),
foreign key(TC_NO) references ogrenci(TC_NO)
);

create table ders(
DERS_ID int not null auto_increment,
DERS_ADI varchar(15) not null,
DERS_SAATI int not null,
primary key(DERS_ID)
);

create table sube(
SUBE_ID int not null auto_increment,
GUN int not null,
DERS_NO int not null,
SINIF varchar(10) not null,
SUBE_NO int not null,
primary key(SUBE_ID, GUN)
);

create table ders_sube(
SUBE_ID int not null,
DERS_ID int not null,
primary key(SUBE_ID),
foreign key(SUBE_ID) references sube(SUBE_ID),
foreign key(DERS_ID) references ders(DERS_ID)
);

create table ogretmen_ogretir(
TC_NO char(11) not null,
SUBE_ID int not null,
primary key(TC_NO, SUBE_ID),
foreign key(SUBE_ID) references sube(SUBE_ID),
foreign key(TC_NO) references ogretmen(TC_NO)
);

create table ogrenci_katilir(
TC_NO char(11) not null,
SUBE_ID int not null,
primary key(TC_NO, SUBE_ID),
foreign key(SUBE_ID) references sube(SUBE_ID),
foreign key(TC_NO) references ogrenci(TC_NO)
);

create table talep(
TC_NO char(11) not null,
DERS_ID int not null,
primary key(TC_NO, DERS_ID),
foreign key(DERS_ID) references ders(DERS_ID),
foreign key(TC_NO) references ogrenci(TC_NO)
);

create table malzeme(
MALZEME_ID int not null auto_increment,
MALZEME_ADI varchar(15) not null,
STOK int not null,
MALZEME_BIRIM varchar(10) not null,
primary key(MALZEME_ID)
);

create table malzeme_kullanimi(
SUBE_ID int not null,
MALZEME_ID int not null,
primary key(SUBE_ID, MALZEME_ID),
foreign key(SUBE_ID) references sube(SUBE_ID),
foreign key(MALZEME_ID) references malzeme(MALZEME_ID)
);

create table gider(
GIDER_ID int not null auto_increment,
GIDER_ADI varchar(15) not null,
GIDER_TUTAR int not null,
GIDER_TARIH date not null,
GIDER_SABIT_MI bool not null,
primary key(GIDER_ID)
);

create table alim(
GIDER_ID int not null,
MALZEME_ID int not null,
primary key(GIDER_ID, MALZEME_ID),
foreign key(GIDER_ID) references gider(GIDER_ID),
foreign key(MALZEME_ID) references malzeme(MALZEME_ID)
);
