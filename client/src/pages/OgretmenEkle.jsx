import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function OgretmenEkle() {
  const [TC_NO, setTC_NO] = useState('');
  const [ISIM, setISIM] = useState('');
  const [SOYISIM, setSOYISIM] = useState('');
  const [ADRES, setADRES] = useState('');
  const [TEL_NO, setTEL_NO] = useState('');
  const [E_POSTA, setE_POSTA] = useState('');
  const [PART_MI, setPART_MI] = useState('0');
  const [MAAS, setMAAS] = useState('');
  const [SAAT, setSAAT] = useState('');

  const handleOgretmenEkle = async () => {
    try {
      let response;
      if (PART_MI === '0') {
        response = await axios.get('http://localhost:3006/api/calisan/fullTime/ogretmenEkle', {
          params: {
            TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, MAAS,
          },
        });
      } else {
        response = await axios.get('http://localhost:3006/api/calisan/partTime/ogretmenEkle', {
          params: {
            TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, SAAT,
          },
        });
      }

      console.log(response.data); // Optional: Handle success response
    } catch (error) {
      console.error('Error adding ogretmen:', error);
      // Optional: Handle error response
    }
  };

  return (
    <div>
      <h2>Ogretmen Ekle</h2>
      <form>
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
        <br />
        {PART_MI === '0' && (
          <label htmlFor="MAAS">
            MAAS:
            <input type="text" id="MAAS" name="MAAS" value={MAAS} onChange={(e) => setMAAS(e.target.value)} />
          </label>
        )}
        <br />
        <label htmlFor="PART_MI">
          PART MI:
          <select id="PART_MI" name="PART_MI" value={PART_MI} onChange={(e) => setPART_MI(e.target.value)}>
            <option value="0">Tam Zamanlı</option>
            <option value="1">Yarı Zamanlı</option>
          </select>
        </label>
        <br />
        {PART_MI === '1' && (
          <div>
            <label htmlFor="SAAT">
              SAAT:
              <input type="text" id="SAAT" name="SAAT" value={SAAT} onChange={(e) => setSAAT(e.target.value)} />
            </label>
            <br />
          </div>
        )}
        <button type="button" onClick={handleOgretmenEkle}>
          Ogretmen Ekle
        </button>
      </form>
    </div>
  );
}

export default OgretmenEkle;
