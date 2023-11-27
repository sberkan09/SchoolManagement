import React from 'react';
import axios from 'axios';
import TableList from '../components/TableList';

function Calisanlar() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/calisan/calisanlariGetir').then((response) => {
        setRows(response.data);
      });
    }());
  }, []);

  return (<TableList rows={{ rows: rows }} />);
}

function CalisanlarPage() {
  return (
    <div>
      <Calisanlar />
    </div>
  );
}

export default CalisanlarPage;
