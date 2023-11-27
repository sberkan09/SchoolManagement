import React from 'react';
import axios from 'axios';
import TableList from '../components/TableList';

function Calisanlar() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    (async function getData() {
      try {
        const response = await axios.get('http://localhost:3006/api/calisan/calisanlariGetir');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }()); // Move the invocation inside the parentheses
  }, []);

  // Pass the 'rows' directly as a prop, not as an object property
  return <TableList rows={rows} />;
}

function CalisanlarPage() {
  return (
    <div>
      <Calisanlar />
    </div>
  );
}

export default CalisanlarPage;
