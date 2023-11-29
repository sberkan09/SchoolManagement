import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AddPage.css';

function SubeBagla() {
  const location = useLocation();
  const [DERS_ID, setDERS_ID] = useState('');
  const [SUBE_ID, setSUBE_ID] = useState('');
  const navigate = useNavigate();

  const handleAddOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ders/subeDersBagla', {
        params: {
          SUBE_ID, DERS_ID,
        },
      });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Ogrenci added successfully:', response.data);
    } catch (error) {
      console.error('Error adding Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
    navigate('/Dersler/');
  };

  return (
    <div className="ogrenci-ekle-container">
      <h2>Şube Bağla</h2>

      <label className="label-add" htmlFor="TC_NO">Şube Id:
        <input className="input-add" type="text" id="TC_NO" value={SUBE_ID} onChange={(e) => setSUBE_ID(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Ders Id:
        <input className="input-add" type="text" id="ISIM" value={DERS_ID} onChange={(e) => setDERS_ID(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddOgrenci}>
        Ekle
      </button>
    </div>
  );
}

export default SubeBagla;
