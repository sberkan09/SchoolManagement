import React from 'react';
import axios from 'axios';
import TableList from '../components/TableList';

function Dersler() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/ders/tumDersleriGetir').then((response) => {
        setRows(response.data);
      });
    }());
  }, []);

  return <TableList rows={rows} visibleColumns={['DERS_ID', 'DERS_ADI', 'DERS_SAATI']} manageTo="/DersManage/" unique="DERS_ID" addTo="/DersEkle/" />;
}

function DerslerPage() {
  return (
    <div>
      <Dersler />
    </div>
  );
}

export default DerslerPage;
