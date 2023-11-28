import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableList from '../components/TableList';
import '../style/FilterableTableList.css';

function OgrenciTypeSelect(ogrenciType, setOgrenciType) {
  return (
    <div className="filters">
      <label htmlFor="ogrenciTypeDropdown">
        <select
          id="ogrenciTypeDropdown"
          value={ogrenciType}
          onChange={(e) => setOgrenciType(e.target.value)}
        >
          <option value="all">Tümü</option>
          <option value="aktif">Aktif</option>
          <option value="mezun">Mezun</option>
        </select>
        Mezun Öğrencileri Göster
      </label>
    </div>
  );
}

function Ogrenciler() {
  const [rows, setRows] = useState([]);
  const [ogrenciType, setOgrenciType] = useState('all');
  const [visibleColumns, setvisibleColumns] = useState(['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI']);
  console.log(ogrenciType);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = 'http://localhost:3006/api/ogrenci/ogrencileriGetir';

      if (ogrenciType === 'mezun') {
        endpoint = 'http://localhost:3006/api/ogrenci/mezunOgrencileriGetir';
        setvisibleColumns(['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI', 'MEZUNIYET_TARIHI']);
      } else if (ogrenciType === 'aktif') {
        endpoint = 'http://localhost:3006/api/ogrenci/aktifOgrencileriGetir';
        setvisibleColumns(['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI']);
      } else if (ogrenciType === 'all') {
        endpoint = 'http://localhost:3006/api/ogrenci/ogrencileriGetir';
        setvisibleColumns(['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI']);
      }

      try {
        const response = await axios.get(endpoint);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ogrenciType]);

  return (
    <div>
      <TableList rows={rows} visibleColumns={visibleColumns} comp={OgrenciTypeSelect(ogrenciType, setOgrenciType)} manageTo="/ogrenciProfili/" unique="TC_NO" />
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
