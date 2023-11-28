import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../style/FilterableTableList.css';

function FilterableTableList({ rows, visibleColumns, comp }) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterTCNO, setFilterTCNO] = useState('');
  const [filterIsim, setFilterIsim] = useState('');
  const [filterSoyisim, setFilterSoyisim] = useState('');
  const [filterTelNo, setFilterTelNo] = useState('');
  const [filterEPosta, setFilterEPosta] = useState('');
  const [filterDogumYili, setFilterDogumYili] = useState('');
  const [dogumYiliFilterType, setDogumYiliFilterType] = useState('exact');
  const [filterDersId, setFilterDersId] = useState('');
  const [filterDersAdi, setfilterDersAdi] = useState('');
  const [filterDersSaati, setfilterDersSaati] = useState('');
  const [filterSubeId, setfilterSubeId] = useState('');
  const [filterGun, setfilterGun] = useState('');
  const [filterDersNo, setfilterDersNo] = useState('');
  const [filterSinif, setfilterSinif] = useState('');
  const [filterSubeNo, setfilterSubeNo] = useState('');

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
        {comp}

        {visibleColumns.includes('TC_NO') && (
          <input
            type="text"
            placeholder="Filter by TC NO"
            value={filterTCNO}
            onChange={(e) => setFilterTCNO(e.target.value)}
          />
        )}

        {visibleColumns.includes('ISIM') && (
          <input
            type="text"
            placeholder="Filter by İsim"
            value={filterIsim}
            onChange={(e) => setFilterIsim(e.target.value)}
          />
        )}

        {visibleColumns.includes('SOYISIM') && (
          <input
            type="text"
            placeholder="Filter by Soyisim"
            value={filterSoyisim}
            onChange={(e) => setFilterSoyisim(e.target.value)}
          />
        )}

        {visibleColumns.includes('TEL_NO') && (
          <input
            type="text"
            placeholder="Filter by Tel No"
            value={filterTelNo}
            onChange={(e) => setFilterTelNo(e.target.value)}
          />
        )}

        {visibleColumns.includes('E_POSTA') && (
          <input
            type="text"
            placeholder="Filter by E-Posta"
            value={filterEPosta}
            onChange={(e) => setFilterEPosta(e.target.value)}
          />
        )}

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

        {visibleColumns.includes('DERS_ID') && (
          <input
            type="text"
            placeholder="Filter by DERS ID"
            value={filterDersId}
            onChange={(e) => setFilterDersId(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_ADI') && (
          <input
            type="text"
            placeholder="Filter by Ders Adı"
            value={filterDersAdi}
            onChange={(e) => setfilterDersAdi(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_SAATI') && (
          <input
            type="text"
            placeholder="Filter by Ders Saati"
            value={filterDersSaati}
            onChange={(e) => setfilterDersSaati(e.target.value)}
          />
        )}

        {visibleColumns.includes('SUBE_ID') && (
          <input
            type="text"
            placeholder="Filter by Şube Id"
            value={filterSubeId}
            onChange={(e) => setfilterSubeId(e.target.value)}
          />
        )}

        {visibleColumns.includes('GUN') && (
          <input
            type="text"
            placeholder="Filter by Gün"
            value={filterGun}
            onChange={(e) => setfilterGun(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_NO') && (
          <input
            type="text"
            placeholder="Filter by Ders No"
            value={filterDersNo}
            onChange={(e) => setfilterDersNo(e.target.value)}
          />
        )}

        {visibleColumns.includes('SINIF') && (
          <input
            type="text"
            placeholder="Filter by Sınıf"
            value={filterSinif}
            onChange={(e) => setfilterSinif(e.target.value)}
          />
        )}

        {visibleColumns.includes('SUBE_NO') && (
          <input
            type="text"
            placeholder="Filter by Şube No"
            value={filterSubeNo}
            onChange={(e) => setfilterSubeNo(e.target.value)}
          />
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th> </th>
            {visibleColumns.includes('TC_NO') && <th>TC NO</th>}
            {visibleColumns.includes('ISIM') && <th>İsim</th>}
            {visibleColumns.includes('SOYISIM') && <th>Soyisim</th>}
            {visibleColumns.includes('ADRES') && <th>Adres</th>}
            {visibleColumns.includes('TEL_NO') && <th>Tel No</th>}
            {visibleColumns.includes('E_POSTA') && <th>E-Posta</th>}
            {visibleColumns.includes('DOGUM_YILI') && <th>YAŞ</th>}
            {visibleColumns.includes('DERS_ID') && <th>DERS ID</th>}
            {visibleColumns.includes('DERS_ADI') && <th>DERS ADI</th>}
            {visibleColumns.includes('DERS_SAATI') && <th>DERS SAATİ</th>}
            {visibleColumns.includes('SUBE_ID') && <th>ŞUBE ID</th>}
            {visibleColumns.includes('GUN') && <th>GÜN</th>}
            {visibleColumns.includes('DERS_NO') && <th>DERS NO</th>}
            {visibleColumns.includes('SINIF') && <th>SINIF</th>}
            {visibleColumns.includes('SUBE_NO') && <th>ŞUBE NO</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.TC_NO}>
              <td>
                <Link to="/OgrenciProfili/" state={{ TC_NO: item.TC_NO }}>
                  <button type="button" className="ogrenci-button">Manage</button>
                </Link>
              </td>
              {visibleColumns.includes('TC_NO') && <td>{item.TC_NO}</td>}
              {visibleColumns.includes('ISIM') && <td>{item.ISIM}</td>}
              {visibleColumns.includes('SOYISIM') && <td>{item.SOYISIM}</td>}
              {visibleColumns.includes('ADRES') && <td>{item.ADRES}</td>}
              {visibleColumns.includes('TEL_NO') && <td>{item.TEL_NO}</td>}
              {visibleColumns.includes('E_POSTA') && <td>{item.E_POSTA}</td>}
              {visibleColumns.includes('DOGUM_YILI') && <td>{new Date().getFullYear() - item.DOGUM_YILI}</td>}
              {visibleColumns.includes('DERS_ID') && <td>{item.DERS_ID}</td>}
              {visibleColumns.includes('DERS_ADI') && <td>{item.DERS_ADI}</td>}
              {visibleColumns.includes('DERS_SAATI') && <td>{item.DERS_SAATI}</td>}
              {visibleColumns.includes('SUBE_ID') && <td>{item.SUBE_ID}</td>}
              {visibleColumns.includes('GUN') && <td>{item.GUN}</td>}
              {visibleColumns.includes('DERS_NO') && <td>{item.DERS_NO}</td>}
              {visibleColumns.includes('SINIF') && <td>{item.SINIF}</td>}
              {visibleColumns.includes('SUBE_NO') && <td>{item.SUBE_NO}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilterableTableList.defaultProps = {
  comp: null,
};

FilterableTableList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      TC_NO: PropTypes.string,
      ISIM: PropTypes.string,
      SOYISIM: PropTypes.string,
      ADRES: PropTypes.string,
      TEL_NO: PropTypes.string,
      E_POSTA: PropTypes.string,
      DOGUM_YILI: PropTypes.number,
      DERS_ID: PropTypes.number,
      DERS_ADI: PropTypes.string,
      DERS_SAATI: PropTypes.number,
      SUBE_ID: PropTypes.number,
      GUN: PropTypes.number,
      DERS_NO: PropTypes.number,
      SINIF: PropTypes.string,
      SUBE_NO: PropTypes.number,
    }),
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  comp: PropTypes.element,
};

export default FilterableTableList;
