import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function FilterableTableList({ rows }) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterTCNO, setFilterTCNO] = useState('');
  const [filterIsim, setFilterIsim] = useState('');
  const [filterSoyisim, setFilterSoyisim] = useState('');
  const [filterTelNo, setFilterTelNo] = useState('');
  const [filterEPosta, setFilterEPosta] = useState('');
  const [filterDogumYili, setFilterDogumYili] = useState('');

  useEffect(() => {
    // Filter the data based on the filter input value for each column
    const filtered = rows.filter((item) => (
      item.TC_NO.toLowerCase().includes(filterTCNO.toLowerCase())
      && item.ISIM.toLowerCase().includes(filterIsim.toLowerCase())
      && item.SOYISIM.toLowerCase().includes(filterSoyisim.toLowerCase())
      && item.TEL_NO.toLowerCase().includes(filterTelNo.toLowerCase())
      && item.E_POSTA.toLowerCase().includes(filterEPosta.toLowerCase())
      && String(item.DOGUM_YILI).includes(filterDogumYili)
    ));

    setFilteredData(filtered);
  }, [
    rows,
    filterTCNO,
    filterIsim,
    filterSoyisim,
    filterTelNo,
    filterEPosta,
    filterDogumYili,
  ]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by TC NO"
        value={filterTCNO}
        onChange={(e) => setFilterTCNO(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by İsim"
        value={filterIsim}
        onChange={(e) => setFilterIsim(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by Soyisim"
        value={filterSoyisim}
        onChange={(e) => setFilterSoyisim(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by Tel No"
        value={filterTelNo}
        onChange={(e) => setFilterTelNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by E-Posta"
        value={filterEPosta}
        onChange={(e) => setFilterEPosta(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by DOGUM_YILI"
        value={filterDogumYili}
        onChange={(e) => setFilterDogumYili(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>TC NO</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Adres</th>
            <th>Tel No</th>
            <th>E-Posta</th>
            <th>DOGUM_YILI</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.TC_NO}>
              <td>{item.TC_NO}</td>
              <td>{item.ISIM}</td>
              <td>{item.SOYISIM}</td>
              <td>{item.ADRES}</td>
              <td>{item.TEL_NO}</td>
              <td>{item.E_POSTA}</td>
              <td>{item.DOGUM_YILI}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilterableTableList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      TC_NO: PropTypes.string.isRequired,
      ISIM: PropTypes.string.isRequired,
      SOYISIM: PropTypes.string.isRequired,
      ADRES: PropTypes.string,
      TEL_NO: PropTypes.string.isRequired,
      E_POSTA: PropTypes.string.isRequired,
      DOGUM_YILI: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default FilterableTableList;
