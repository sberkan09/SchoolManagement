import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AddPage.css';

function SubeEkle() {
  const location = useLocation();
  const [GUN, setGUN] = useState('');
  const [DERS_NO, setDERS_NO] = useState('');
  const [SINIF, setSINIF] = useState('');
  const [SUBE_NO, setSUBE_NO] = useState('');
  const [DERS_ID, setDERS_ID] = useState('');
  const [SUBE_ID, setSUBE_ID] = useState(null);

  const handleAddOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/sube/subeEkle', {
        params: {
          GUN, DERS_NO, SINIF, SUBE_NO,
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
      <h2>Şube Ekle</h2>

      <label className="label-add" htmlFor="TC_NO">Gün:
        <input className="input-add" type="text" id="TC_NO" value={GUN} onChange={(e) => setGUN(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Ders No:
        <input className="input-add" type="text" id="ISIM" value={DERS_NO} onChange={(e) => setDERS_NO(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Sınıf:
        <input className="input-add" type="text" id="ISIM" value={SINIF} onChange={(e) => setSINIF(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Şube No:
        <input className="input-add" type="text" id="ISIM" value={SUBE_NO} onChange={(e) => setSUBE_NO(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddOgrenci}>
        Ekle
      </button>
    </div>
  );
}

export default SubeEkle;
