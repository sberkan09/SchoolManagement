import React from 'react';
import axios from 'axios';

function OgrenciList() {
  const [ogrenci, setOgrenci] = React.useState(null);
  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir').then((response) => {
        setOgrenci(response.data);
      });
    }());
  }, []);

  if (!ogrenci) return null;

  console.log(ogrenci);

  return (
    <div>
      <div>
        <p>
          TC NO:
          {ogrenci.TC_NO}
        </p>
        <p>
          İsim:
          {ogrenci.ISIM}
        </p>
        <p>
          Soyisim:
          {ogrenci.SOYISIM}
        </p>
        <p>
          Adres:
          {ogrenci.ADRES}
        </p>
        <p>
          Tel No:
          {ogrenci.TEL_NO}
        </p>
        <p>
          E-Posta:
          {ogrenci.E_POSTA}
        </p>
        <br />
      </div>
    </div>
  );
}

export default function Ogrenci() {
  return (
    <div>
      <OgrenciList />
    </div>
  );
}
