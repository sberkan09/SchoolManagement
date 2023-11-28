import React from 'react';
import axios from 'axios';
import TableList from '../components/TableList';

function Calisanlar() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/calisan/calisanlariGetir');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function directly
  }, []);

  // Pass the 'rows' directly as a prop, not as an object property
  return <TableList rows={rows} visibleColumns={['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA']} manageTo="/calisanProfili/" unique="TC_NO" addTo="/CalisanEkle/" />;
}

function CalisanlarPage() {
  return (
    <div>
      <Calisanlar />
    </div>
  );
}

export default CalisanlarPage;
