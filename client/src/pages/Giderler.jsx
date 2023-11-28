import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableList2 from '../components/TableList2';
import '../style/FilterableTableList.css';

function GiderTypeSelect(giderType, setGiderType) {
  return (
    <div className="filters">
      <label htmlFor="giderTypeDropdown">
        <select
          id="giderTypeDropdown"
          value={giderType}
          onChange={(e) => setGiderType(e.target.value)}
        >
          <option value="all">Tümü</option>
          <option value="degisken">Değişken Gider</option>
          <option value="sabit">Sabit Gider</option>
        </select>
        Gider türünü değiştir
      </label>
    </div>
  );
}

function Giderler() {
  const [rows, setRows] = useState([]);
  const [giderType, setGiderType] = useState('all');
  const [visibleColumns, setvisibleColumns] = useState(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = 'http://localhost:3006/api/gider/tumGiderleriGetir';

      if (giderType === 'sabit') {
        endpoint = 'http://localhost:3006/api/gider/sabitGiderGetir';
        setvisibleColumns(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
      } else if (giderType === 'degisken') {
        endpoint = 'http://localhost:3006/api/gider/degiskenGiderGetir';
        setvisibleColumns(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
      } else if (giderType === 'all') {
        endpoint = 'http://localhost:3006/api/gider/tumGiderleriGetir';
        setvisibleColumns(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
      }

      try {
        const response = await axios.get(endpoint);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [giderType]);

  return (
    <div>
      <TableList2 rows={rows} visibleColumns={visibleColumns} comp={GiderTypeSelect(giderType, setGiderType)} manageTo="/GiderManage/" unique="GIDER_ID" />
    </div>
  );
}

function GiderlerPage() {
  return (
    <div>
      <Giderler />
    </div>
  );
}

export default GiderlerPage;
