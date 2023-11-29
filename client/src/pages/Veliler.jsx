import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TableList from '../components/TableList';
import '../style/FilterableTableList.css';

function Veliler() {
  const [rows, setRows] = useState([]);
  const [veliType, setVeliType] = useState('all');
  const [visibleColumns, setvisibleColumns] = useState(['TC_NO', 'OTC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA']);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'http://localhost:3006/api/veli/veliGetir';
      setvisibleColumns();

      try {
        const response = await axios.get(endpoint);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [veliType]);

  return (
    <div>
      <TableList
        rows={rows}
        visibleColumns={['TC_NO', 'OTC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'YAKINLIK']}
        manageTo="/VeliProfili/"
        unique="TC_NO"
        addTo="/VeliEkle/"
      />
    </div>
  );
}

function VelilerPage() {
  return (
    <div>
      <Veliler />
    </div>
  );
}

export default VelilerPage;
