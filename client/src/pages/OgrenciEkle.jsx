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
  const [VTC_NO, setVTC_NO] = useState('');
  const [VISIM, setVISIM] = useState('');
  const [VSOYISIM, setVSOYISIM] = useState('');
  const [VADRES, setVADRES] = useState('');
  const [VTEL_NO, setVTEL_NO] = useState('');
  const [VE_POSTA, setVE_POSTA] = useState('');
  const [YAKINLIK, setYAKINLIK] = useState('');

  const handleAddOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ogrenci/aktifOgrenciEkle', {
        params: {
          TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, DOGUM_YILI, VTC_NO, VISIM, VSOYISIM, VADRES, VTEL_NO, VE_POSTA, YAKINLIK,
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
      <h2>Öğrenci Ekle</h2>

      <label className="label-add" htmlFor="TC_NO">TC NO:
        <input className="input-add" type="text" id="TC_NO" value={TC_NO} onChange={(e) => setTC_NO(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">İsim:
        <input className="input-add" type="text" id="ISIM" value={ISIM} onChange={(e) => setISIM(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="SOYISIM">Soyisim:
        <input className="input-add" type="text" id="SOYISIM" value={SOYISIM} onChange={(e) => setSOYISIM(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ADRES">Adres:
        <input className="input-add" type="text" id="ADRES" value={ADRES} onChange={(e) => setADRES(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="TEL_NO">Tel No:
        <input className="input-add" type="text" id="TEL_NO" value={TEL_NO} onChange={(e) => setTEL_NO(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="E_POSTA">E-Posta:
        <input className="input-add" type="text" id="E_POSTA" value={E_POSTA} onChange={(e) => setE_POSTA(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="DOGUM_YILI">Doğum Yılı:
        <input className="input-add" type="text" id="DOGUM_YILI" value={DOGUM_YILI} onChange={(e) => setDOGUM_YILI(parseInt(e.target.value, 10))} />
      </label>

      <label className="label-add" htmlFor="TC_NO">Veli TC NO:
        <input className="input-add" type="text" id="TC_NO" value={VTC_NO} onChange={(e) => setVTC_NO(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Veli İsim:
        <input className="input-add" type="text" id="ISIM" value={VISIM} onChange={(e) => setVISIM(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="SOYISIM">Veli Soyisim:
        <input className="input-add" type="text" id="SOYISIM" value={VSOYISIM} onChange={(e) => setVSOYISIM(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ADRES">Veli Adres:
        <input className="input-add" type="text" id="ADRES" value={VADRES} onChange={(e) => setVADRES(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="TEL_NO">Veli Tel No:
        <input className="input-add" type="text" id="TEL_NO" value={VTEL_NO} onChange={(e) => setVTEL_NO(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="E_POSTA">Veli E-Posta:
        <input className="input-add" type="text" id="E_POSTA" value={VE_POSTA} onChange={(e) => setVE_POSTA(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="E_POSTA">Yakınlık:
        <input className="input-add" type="text" id="E_POSTA" value={YAKINLIK} onChange={(e) => setYAKINLIK(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddOgrenci}>
        Ekle
      </button>
    </div>
  );
}

export default OgrenciEkle;
