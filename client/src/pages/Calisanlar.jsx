import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TableList from '../components/TableList';
import '../style/FilterableTableList.css';

function CalisanTypeSelect({ calisanType, setCalisanType, fetchData }) {
  return (
    <div className="filters">
      <label htmlFor="calisanTypeDropdown">
        <select
          id="calisanTypeDropdown"
          value={calisanType}
          onChange={(e) => {
            setCalisanType(e.target.value);
            fetchData(e.target.value);
          }}
        >
          <option value="all">Tümü</option>
          <option value="ogretmen">Öğretmen</option>
          <option value="idareci">İdareci</option>
          <option value="temizlikci">Temizlik Görevlisi</option>
        </select>
        Çalışan türünü değiştir
      </label>
    </div>
  );
}

CalisanTypeSelect.propTypes = {
  calisanType: PropTypes.string.isRequired,
  setCalisanType: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

function Calisanlar() {
  const [rows, setRows] = React.useState([]);
  const [calisanType, setCalisanType] = useState('all');

  const fetchData = async (selectedType) => {
    try {
      let endpoint = 'http://localhost:3006/api/calisan/calisanlariGetir'; // Default endpoint

      if (selectedType === 'ogretmen') {
        // Update endpoint based on selected type
        endpoint = 'http://localhost:3006/api/calisan/ogretmenGetir';
      } else if (selectedType === 'temizlikci') {
        // Update endpoint based on selected type
        endpoint = 'http://localhost:3006/api/calisan/temizlikGetir';
      } else if (selectedType === 'idareci') {
        // Update endpoint based on selected type
        endpoint = 'http://localhost:3006/api/calisan/idareciGetir';
      }

      const response = await axios.get(endpoint);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(calisanType); // Call the fetchData function with the initial value
  }, [calisanType]);

  return (
    <div>
      <CalisanTypeSelect calisanType={calisanType} setCalisanType={setCalisanType} fetchData={fetchData} />
      <TableList rows={rows} visibleColumns={['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA']} manageTo="/calisanProfili/" unique="TC_NO" addTo="/CalisanEkle/" />
    </div>
  );
}

function CalisanlarPage() {
  return (
    <div>
      <Calisanlar />
    </div>
  );
}

export default CalisanlarPage;
