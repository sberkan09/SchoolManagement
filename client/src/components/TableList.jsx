import React from 'react';
import { Link } from 'react-router-dom';

function List(rows) {
  console.log(rows);
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

export default List;
