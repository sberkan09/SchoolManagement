#Tum ogrenciler
select *
from ogrenci;

#Tum aktif ogrenciler
select *
from aktif as a left outer join ogrenci as ogr on (a.TC_NO = ogr.TC_NO);

#Tum mezun ogrenciler
select *
from mezun as m left outer join ogrenci as ogr on (a.TC_NO = m.TC_NO);

#Tum calisanlar
select *
from calisan;

#Tum ogretmenler
select *
case 
	when o.PART_MI then "Part-Time"
	else "Full-Time"
end as PART_MI 
from ogretmen as o left outer join calisan as c on (o.TC_NO = c.TC_NO);

#Tum temizlikci
select *
from temizlikci as t left outer join calisan as c on (t.TC_NO = c.TC_NO);

#Full-timerler
select *
from full_timer as ft left outer join calisan as c on (ft.TC_NO = c.TC_NO);

#Part-timerler
select *
from (part_timer as pt left outer join calisan as c on (pt.TC_NO = c.TC_NO)) left outer join ucret_tablosu as ut on (pt.SAAT=ut.SAAT);

#Part-time musaitlik tablosu
select GUN, DERS_NO
from part_time_musaitlik as ptm left outer join calisan as c on (ptm.TC_NO = c.TC_NO)
where c.TC_NO in (select TC_NO
				  from calisan
				  where ISIM = xxx and SOYISIM = yyyy);
				 
#ogrenci musaitlik tablosu
select GUN, DERS_NO
from ogrenci_musaitlik as om  left outer join ogrenci as o on (om.TC_NO = o.TC_NO)
where o.TC_NO in (select TC_NO
				  from ogrenci
				  where ISIM = xxx and SOYISIM = yyyy);

#Ders Talep sayilari
select Ders_ADI, Count(DERS_ID) as "Talep"
from talep t left outer join ders d on (t.DERS_ID = d.DERS_ID)
group by d.DERS_ADI;


#Dersi talep eden ogrenciler
select TC_NO, ISIM, SOYISIM
from talep t left outer join ogrenci o on (t.TC_NO=o.TC_NO))
where DERS_ID in (select DERS_ID
				   from ders
				   where DERS_ADI = AAAAAAAAAA);


#Dersler
select DERS_ADI, DERS_SAATI 
from ders d;





