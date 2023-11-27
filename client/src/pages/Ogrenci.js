import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OgrenciList() {
  const [dataResponse, setDataResponse] = useState([]);
  useEffect(() => {
    async function getPageData() {
      const apiUrl = '/api/ogrenci/ogrencileriGetir';
      const response = await fetch(apiUrl);
      const res = await response.json();
      setDataResponse(res.students);
    }
    getPageData();
  }, []);
  return (
    <div className="App">
      {dataResponse.map((dataObj) => {
        const a = (
          <div>
            <p>
              TC NO:
              {dataObj.TC_NO}
            </p>
            <p>
              İsim:
              {dataObj.ISIM}
            </p>
            <p>
              Soyisim:
              {dataObj.SOYISIM}
            </p>
            <p>
              Adres:
              {dataObj.ADRES}
            </p>
            <p>
              Tel No:
              {dataObj.TEL_NO}
            </p>
            <p>
              E-Posta:
              {dataObj.E_POSTA}
            </p>
            <br />
          </div>
        );
        return a;
      })}
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
