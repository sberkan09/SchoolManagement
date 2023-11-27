import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../style/FilterableTableList.css'; // Import a CSS file for styling

function FilterableTableList({ rows, visibleColumns }) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterTCNO, setFilterTCNO] = useState('');
  const [filterIsim, setFilterIsim] = useState('');
  const [filterSoyisim, setFilterSoyisim] = useState('');
  const [filterTelNo, setFilterTelNo] = useState('');
  const [filterEPosta, setFilterEPosta] = useState('');
  const [filterDogumYili, setFilterDogumYili] = useState('');
  const [dogumYiliFilterType, setDogumYiliFilterType] = useState('exact');

  useEffect(() => {
    // Filter the data based on the filter input value for each column
    const filtered = rows.filter((item) => {
      const isTCNOMatch = item.TC_NO.toLowerCase().includes(filterTCNO.toLowerCase());
      const isIsimMatch = item.ISIM.toLowerCase().includes(filterIsim.toLowerCase());
      const isSoyisimMatch = item.SOYISIM.toLowerCase().includes(filterSoyisim.toLowerCase());
      const isTelNoMatch = item.TEL_NO.toLowerCase().includes(filterTelNo.toLowerCase());
      const isEPostaMatch = item.E_POSTA.toLowerCase().includes(filterEPosta.toLowerCase());

      let isDogumYiliMatch = true;
      if (dogumYiliFilterType === 'exact') {
        isDogumYiliMatch = String(new Date().getFullYear() - item.DOGUM_YILI).includes(filterDogumYili);
      } else if (dogumYiliFilterType === 'range' && filterDogumYili) {
        const [min, max] = filterDogumYili.split('-').map(Number);
        isDogumYiliMatch = new Date().getFullYear() - item.DOGUM_YILI >= Math.min(min, max) && new Date().getFullYear() - item.DOGUM_YILI <= Math.max(min, max);
      }

      return (
        isTCNOMatch
        && isIsimMatch
        && isSoyisimMatch
        && isTelNoMatch
        && isEPostaMatch
        && isDogumYiliMatch
      );
    });

    setFilteredData(filtered);
  }, [
    rows,
    filterTCNO,
    filterIsim,
    filterSoyisim,
    filterTelNo,
    filterEPosta,
    filterDogumYili,
    dogumYiliFilterType,
  ]);

  return (
    <div>
      <div className="filters">
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

        {visibleColumns.includes('DOGUM_YILI') && (
          <label htmlFor="dogumYiliFilterType">Yaş Filter Type:
            <select
              id="dogumYiliFilterType"
              value={dogumYiliFilterType}
              onChange={(e) => setDogumYiliFilterType(e.target.value)}
            >
              <option value="exact">Exact</option>
              <option value="range">Range</option>
            </select>
          </label>
        )}

        {visibleColumns.includes('DOGUM_YILI') && dogumYiliFilterType === 'exact' && (
          <input
            type="number"
            placeholder="Filter by YAŞ"
            value={filterDogumYili}
            onChange={(e) => setFilterDogumYili(e.target.value)}
          />
        )}

        {visibleColumns.includes('DOGUM_YILI') && dogumYiliFilterType === 'range' && (
          <input
            type="text"
            placeholder="Filter by YAŞ (Min-Max)"
            value={filterDogumYili}
            onChange={(e) => setFilterDogumYili(e.target.value)}
          />
        )}
      </div>

      <table>
        <thead>
          <tr>
            {visibleColumns.includes('TC_NO') && <th>TC NO</th>}
            {visibleColumns.includes('ISIM') && <th>İsim</th>}
            {visibleColumns.includes('SOYISIM') && <th>Soyisim</th>}
            {visibleColumns.includes('ADRES') && <th>Adres</th>}
            {visibleColumns.includes('TEL_NO') && <th>Tel No</th>}
            {visibleColumns.includes('E_POSTA') && <th>E-Posta</th>}
            {visibleColumns.includes('DOGUM_YILI') && <th>YAŞ</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.TC_NO}>
              <td>
                <Link to="/OgrenciProfili/" state={{ TC_NO: item.TC_NO }}>
                  <button type="button">Manage</button>
                </Link>
              </td>
              {visibleColumns.includes('TC_NO') && <td>{item.TC_NO}</td>}
              {visibleColumns.includes('ISIM') && <td>{item.ISIM}</td>}
              {visibleColumns.includes('SOYISIM') && <td>{item.SOYISIM}</td>}
              {visibleColumns.includes('ADRES') && <td>{item.ADRES}</td>}
              {visibleColumns.includes('TEL_NO') && <td>{item.TEL_NO}</td>}
              {visibleColumns.includes('E_POSTA') && <td>{item.E_POSTA}</td>}
              {visibleColumns.includes('DOGUM_YILI') && <td>{new Date().getFullYear() - item.DOGUM_YILI}</td>}
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
      DOGUM_YILI: PropTypes.number,
    }),
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterableTableList;