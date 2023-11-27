import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Ogrenciler() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir').then((response) => {
        setRows(response.data);
      });
    }());
  }, []);

  return (
    <>
      {rows.map((row) => (
        <div>
          <div>
            <p>
              <Link to="/Ogrenci/123">
                <button type="button">
                  Ogrenci
                </button>
              </Link>
            </p>
            <p>
              TC NO:
              {row.TC_NO}
            </p>
            <p>
              İsim:
              {row.ISIM}
            </p>
            <p>
              Soyisim:
              {row.SOYISIM}
            </p>
            <p>
              Adres:
              {row.ADRES}
            </p>
            <p>
              Tel No:
              {row.TEL_NO}
            </p>
            <p>
              E-Posta:
              {row.E_POSTA}
            </p>
            <br />
          </div>
        </div>
      ))}
    </>
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
