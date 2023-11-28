import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function OgrenciEkle() {
  const [TC_NO, setTC_NO] = useState('');
  const [ISIM, setISIM] = useState('');
  const [SOYISIM, setSOYISIM] = useState('');
  const [ADRES, setADRES] = useState('');
  const [TEL_NO, setTEL_NO] = useState('');
  const [E_POSTA, setE_POSTA] = useState('');
  const [DOGUM_YILI, setDOGUM_YILI] = useState('');

  const handleAddOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ogrenci/aktifOgrenciEkle', {
        params: {
          TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, DOGUM_YILI,
        },
      });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Ogrenci added successfully:', response.data);
    } catch (error) {
      console.error('Error adding Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="ogrenci-ekle-container">
      <h2>Ogrenci Ekle</h2>

      <label htmlFor="TC_NO">TC NO:
        <input type="text" id="TC_NO" value={TC_NO} onChange={(e) => setTC_NO(e.target.value)} />
      </label>

      <label htmlFor="ISIM">İsim:
        <input type="text" id="ISIM" value={ISIM} onChange={(e) => setISIM(e.target.value)} />
      </label>

      <label htmlFor="SOYISIM">Soyisim:
        <input type="text" id="SOYISIM" value={SOYISIM} onChange={(e) => setSOYISIM(e.target.value)} />
      </label>

      <label htmlFor="ADRES">Adres:
        <input type="text" id="ADRES" value={ADRES} onChange={(e) => setADRES(e.target.value)} />
      </label>

      <label htmlFor="TEL_NO">Tel No:
        <input type="text" id="TEL_NO" value={TEL_NO} onChange={(e) => setTEL_NO(e.target.value)} />
      </label>

      <label htmlFor="E_POSTA">E-Posta:
        <input type="text" id="E_POSTA" value={E_POSTA} onChange={(e) => setE_POSTA(e.target.value)} />
      </label>

      <label htmlFor="DOGUM_YILI">Doğum Yılı:
        <input type="text" id="DOGUM_YILI" value={DOGUM_YILI} onChange={(e) => setDOGUM_YILI(parseInt(e.target.value, 10))} />
      </label>

      <button type="button" onClick={handleAddOgrenci}>
        Ekle
      </button>
    </div>
  );
}

export default OgrenciEkle;
