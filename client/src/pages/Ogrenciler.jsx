import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableList from '../components/TableList';
import '../style/FilterableTableList.css';

function OgrenciTypeSelect(showMezun, setShowMezun) {
  return (
    <div className="filters">
      <label htmlFor="mezunCheckbox">
        <input
          type="checkbox"
          id="mezunCheckbox"
          checked={showMezun}
          onChange={() => setShowMezun(!showMezun)}
        />
        Mezun Öğrencileri Göster
      </label>
    </div>
  );
}

function Ogrenciler() {
  const [rows, setRows] = useState([]);
  const [showMezun, setShowMezun] = useState(false);
  let visibleColumns = ['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI'];

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = 'http://localhost:3006/api/ogrenci/ogrencileriGetir';

      if (showMezun) {
        endpoint = 'http://localhost:3006/api/ogrenci/mezunOgrencileriGetir';
        visibleColumns = ['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI', 'MEZUNIYET_TARIHI'];
      } else {
        endpoint = 'http://localhost:3006/api/ogrenci/aktifOgrencileriGetir';
        visibleColumns = ['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI'];
      }

      try {
        const response = await axios.get(endpoint);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [showMezun]);

  return (
    <div>
      <TableList rows={rows} visibleColumns={visibleColumns} comp={OgrenciTypeSelect(showMezun, setShowMezun)} />
    </div>
  );
}

function OgrencilerPage() {
  return (
    <div>
      <Ogrenciler />
    </div>
  );
}

export default OgrencilerPage;
