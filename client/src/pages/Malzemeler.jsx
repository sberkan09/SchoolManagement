import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableList2 from '../components/TableList2';
import TableList from '../components/TableList';
import '../style/FilterableTableList.css';

function Malzemeler() {
  const [rows, setRows] = useState([]);
  const [malzemeType, setMalzemeType] = useState('all');
  const [visibleColumns, setvisibleColumns] = useState([
    'MALZEME_ADI',
    'MALZEME_ID',
    'MALZEME_BIRIM',
    'STOK',
    'SUBE_ID',
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'http://localhost:3006/api/malzeme/tumMalzemeleriGetir';
      setvisibleColumns([
        'MALZEME_ADI',
        'MALZEME_ID',
        'MALZEME_BIRIM',
        'STOK',
        'SUBE_ID',
      ]);

      try {
        const response = await axios.get(endpoint);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [malzemeType]);

  return (
    <div>
      <TableList2
        rows={rows}
        visibleColumns={visibleColumns}
        manageTo="/MalzemeManage/"
        unique="MALZEME_ID"
      />
    </div>
  );
}

function MalzemelerPage() {
  return (
    <div>
      <Malzemeler />
    </div>
  );
}

export default MalzemelerPage;
