#1
#Gider negatif girilirse 
DELIMITER //

CREATE TRIGGER before_insert_gider
BEFORE INSERT ON gider
FOR EACH ROW
BEGIN
    IF NEW.GIDER_TUTAR < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Gider tutari negatif olamaz';
    END IF;
END //

DELIMITER ;

#2
#stok 1 degerinin altina duserse
DELIMITER //

CREATE TRIGGER before_update_malzeme_stok
BEFORE UPDATE ON malzeme
FOR EACH ROW
BEGIN
    IF NEW.STOK <= 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CONCAT('Uyari: Malzeme stoku ', NEW.STOK, ' adet kaldi!');
    END IF;
END //

DELIMITER ;




#3
#ogrenci silme
DELIMITER //

CREATE TRIGGER before_delete_ogrenci
BEFORE DELETE ON ogrenci
FOR EACH ROW
BEGIN
    DECLARE veli_tc_no CHAR(11);
    DECLARE veli_linked_other_student INT;

    -- Öğrenciye bağlı velinin TC kimlik numarasını bul
    SELECT VTC_NO INTO veli_tc_no FROM aile_iliskisi WHERE OTC_NO = OLD.TC_NO;

    -- Öğrenci-veli ilişkisini sil
    DELETE FROM aile_iliskisi WHERE OTC_NO = OLD.TC_NO;

    -- Bu velinin başka bir öğrenciyle ilişkilendirilip ilişkilendirilmediğini kontrol et
    SELECT COUNT(*) INTO veli_linked_other_student FROM aile_iliskisi WHERE VTC_NO = veli_tc_no;

    -- Eğer veli başka bir öğrenciyle ilişkilendirilmemişse, veliyi sil
    IF veli_linked_other_student = 0 THEN
        DELETE FROM veli WHERE TC_NO = veli_tc_no;
    END IF;
END //

DELIMITER ;

#4
#Talep degeri 10dan buyuk olan dersler icin uyari mesaji yolla
DELIMITER //

CREATE TRIGGER after_update_talep
AFTER UPDATE ON talep
FOR EACH ROW
BEGIN
    DECLARE toplam_talep INT;

    -- Güncellenen DERS_ID için toplam talep sayısını hesapla
    SELECT COUNT(*) INTO toplam_talep FROM talep WHERE DERS_ID = NEW.DERS_ID;

    -- Eğer toplam talep sayısı 10'dan büyükse
    IF toplam_talep > 10 THEN
        -- Uyarı mesajını yazdır
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CONCAT('Dikkat!: ', NEW.DERS_ID, ' dersine ait talep sayisi 10dan büyük! Ders acilabilir.');
    END IF;
END //

DELIMITER ;

