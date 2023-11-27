import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function FilterableTableList({ rows }) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Filter the data based on the filter input value
    const filtered = rows.filter((item) => (
      item.TC_NO.toLowerCase().includes(filter.toLowerCase())
      || item.ISIM.toLowerCase().includes(filter.toLowerCase())
      || item.SOYISIM.toLowerCase().includes(filter.toLowerCase())
      || item.ADRES.toLowerCase().includes(filter.toLowerCase())
      || item.TEL_NO.toLowerCase().includes(filter.toLowerCase())
      || item.E_POSTA.toLowerCase().includes(filter.toLowerCase())
    ));

    setFilteredData(filtered);
  }, [rows, filter]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by TC NO, İsim, Soyisim, Adres, Tel No, E-Posta"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
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
            <th>YAS</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.TC_NO}</td>
              <td>{item.ISIM}</td>
              <td>{item.SOYISIM}</td>
              <td>{item.ADRES}</td>
              <td>{item.TEL_NO}</td>
              <td>{item.E_POSTA}</td>
              <td>{item.YAS}</td>
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
      ADRES: PropTypes.string.isRequired,
      TEL_NO: PropTypes.string.isRequired,
      E_POSTA: PropTypes.string.isRequired,
      YAS: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default FilterableTableList;
