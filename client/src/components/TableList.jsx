import React from 'react';

function List({ rows }) {
  return (
    <>
      {rows.map((row, index) => (
        <div key={index}>
          <div>
            <p>
              TC NO: {row.TC_NO}
            </p>
            <p>
              İsim: {row.ISIM}
            </p>
            <p>
              Soyisim: {row.SOYISIM}
            </p>
            <p>
              Adres: {row.ADRES}
            </p>
            <p>
              Tel No: {row.TEL_NO}
            </p>
            <p>
              E-Posta: {row.E_POSTA}
            </p>
            <br />
          </div>
        </div>
      ))}
    </>
  );
}

export default List;
