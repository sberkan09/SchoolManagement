import React from 'react';
import axios from 'axios';
import TableList from '../components/TableList';

function Ogrenciler() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir').then((response) => {
        setRows(response.data);
      });
    }());
  }, []);

  return <TableList rows={rows} visibleColumns={['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI']} />;
}

function OgrencilerPage() {
  return (
    <div>
      <Ogrenciler />
    </div>
  );
}

export default OgrencilerPage;
