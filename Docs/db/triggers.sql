#1
#Gider negatif girilirse 
CREATE DEFINER=`u828725825_root`@`%` TRIGGER giderPositive
BEFORE INSERT ON gider 
FOR EACH ROW
BEGIN
    DECLARE message VARCHAR(50);
   	SET message = CONCAT('Dikkat!: Gider degeri negatif olamaz.');
	
   IF NEW.GIDER_TUTAR < 0 THEN
        -- Uyarı mesajını yazdır
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message;
    END IF;
END

#2
#stok 1 degerinin altina duserse
CREATE DEFINER=`u828725825_root`@`%` TRIGGER Stok
BEFORE UPDATE ON malzeme 
FOR EACH ROW
BEGIN
    DECLARE message VARCHAR(50);
   	SET message = CONCAT('Uyari: Malzeme stoku ', NEW.STOK, ' adet kaldi!');
	
   IF NEW.STOK <= 5 THEN
        -- Uyarı mesajını yazdır
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message;
    END IF;
END




#3
#ogrenci silme
DELIMITER //
CREATE DEFINER=`u828725825_root`@`%` TRIGGER ogrenciSil
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
END

#4
#Talep degeri 10dan buyuk olan dersler icin uyari mesaji yolla
CREATE DEFINER=`u828725825_root`@`%` TRIGGER talep
AFTER INSERT ON talep 
FOR EACH ROW
BEGIN
    DECLARE toplam_talep INT;
    DECLARE message VARCHAR(50);

    -- Güncellenen DERS_ID için toplam talep sayısını hesapla
    SELECT COUNT(*) INTO toplam_talep FROM talep WHERE DERS_ID = NEW.DERS_ID;
    
    SET message = CONCAT('Dikkat!: ', NEW.DERS_ID, ' dersine ait talep sayısı 10\'dan büyük! Ders açılabilir.');

    -- Eğer toplam talep sayısı 10'dan büyükse
    IF toplam_talep > 10 THEN
        -- Uyarı mesajını yazdır
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message;
    END IF;
END
