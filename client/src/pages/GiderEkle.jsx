import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GiderEkle() {
  const navigate = useNavigate();

  const [giderTur, setGiderTur] = useState('sabit');
  const [GIDER_ADI, setGiderAdi] = useState('');
  const [GIDER_TUTAR, setGiderTutar] = useState('');
  const [GIDER_TARIH, setGiderTarih] = useState('');

  const handleGiderEkle = async () => {
    try {
      let endpoint = '';
      console.log(giderTur);
      if (giderTur === 'sabit') {
        endpoint = 'http://localhost:3006/api/gider/sabitGiderEkle';
      } else if (giderTur === 'degisken') {
        endpoint = 'http://localhost:3006/api/gider/degiskenGiderEkle';
      }
      console.log('Endpoint', endpoint);
      console.log('TARİH', GIDER_TARIH);

      const response = await axios.get(endpoint, {
        params: {
          GIDER_ADI,
          GIDER_TUTAR,
          GIDER_TARIH,
        },
      });

      console.log('Gider ekleme başarılı:', response.data);

      // Gider ekledikten sonra Giderler sayfasına yönlendir
      navigate('/Giderler');
    } catch (error) {
      console.error('Gider ekleme hatası:', error);
    }
  };

  return (
    <div>
      <h2>Gider Ekle</h2>
      <form>
        <label htmlFor="giderTurDropdown">
          Gider Türü:
          <select value={giderTur} onChange={(e) => setGiderTur(e.target.value)}>
            <option value="sabit">Sabit Gider</option>
            <option value="degisken">Değişken Gider</option>
          </select>
        </label>
        <br />

        <label htmlFor="giderAdiInput">
          Gider Adı:
          <input type="text" value={GIDER_ADI} onChange={(e) => setGiderAdi(e.target.value)} />
        </label>
        <br />

        <label htmlFor="giderTutarInput">
          Gider Tutarı:
          <input type="text" value={GIDER_TUTAR} onChange={(e) => setGiderTutar(e.target.value)} />
        </label>
        <br />

        <label htmlFor="giderTarihInput">
          Gider Tarihi:
          <input type="date" value={GIDER_TARIH} onChange={(e) => setGiderTarih(e.target.value)} />
        </label>
        <br />

        <button type="button" onClick={handleGiderEkle}>
          Gider Ekle
        </button>
      </form>
    </div>
  );
}

export default GiderEkle;
