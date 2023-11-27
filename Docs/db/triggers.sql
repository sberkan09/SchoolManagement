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
    IF NEW.STOK = 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Uyari: Malzeme stoku 1 oldu!';
    END IF;
END //

DELIMITER ;


#3
#ogrenci silme?
DELIMITER //

CREATE TRIGGER before_delete_ogrenci
BEFORE DELETE ON ogrenci
FOR EACH ROW
BEGIN
    DECLARE veli_count INT;

    -- Öğrencinin veli sayısını kontrol et
    SELECT COUNT(*) INTO veli_count
    FROM aile_iliskisi
    WHERE OTC_NO = OLD.TC_NO OR VTC_NO = OLD.TC_NO;

    -- Eğer sadece bu öğrenciye ait bir veli varsa, veliyi tamamen sil
    IF veli_count = 1 THEN
        DELETE FROM veli WHERE TC_NO = OLD.TC_NO;
    
    -- Eğer başka öğrencilere de veli olarak kayıtlı ise, sadece aile ilişkisini sil
    ELSE
        DELETE FROM aile_iliskisi WHERE OTC_NO = OLD.TC_NO OR VTC_NO = OLD.TC_NO;
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

    -- Belirli bir derse ait taleplerin toplamını kontrol et
    SELECT COUNT(*) INTO toplam_talep
    FROM talep
    GROUP BY DERS_ID;


    -- Eğer toplam talep sayısı 10'dan büyükse
    IF toplam_talep > 10 THEN
        -- Uyarı mesajını yazdır
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `Dikkat!: '${DERS_ID}' dersine ait talep sayisi 10'dan büyük!`;
    END IF;
END //

DELIMITER ;
