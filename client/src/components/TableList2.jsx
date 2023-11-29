import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../style/FilterableTableList.css';

function Add({
  addTo, unique,
}) {
  return (
    <Link to={addTo} state={unique}>
      <button type="button" className="ogrenci-button">Add</button>
    </Link>
  );
}

function FilterableTableList({
  rows, visibleColumns, comp, manageTo, unique,
}) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterM_Adi, setFilterM_Adi] = useState('');
  const [filterM_id, setFilterM_id] = useState('');
  const [filterM_birim, setFilterM_birim] = useState('');
  const [filterM_stok, setFilterM_stok] = useState('');
  const [filterG_id, setFilterG_id] = useState('');
  const [filterG_tutar, setFilterG_tutar] = useState('');
  const [filterG_adi, setFilterG_adi] = useState('');
  const [filterG_tarih, setFilterG_tarih] = useState('');

  useEffect(() => {
    const filtered = rows.filter((item) => {
      let isM_AdiMatch = true;
      let isM_idMatch = true;
      let isM_birimMatch = true;
      let isM_stokMatch = true;
      let isG_idMatch = true;
      let isG_tutarMatch = true;
      let isG_adiMatch = true;
      let isG_tarihMatch = true;

      if (item.MALZEME_ADI) { isM_AdiMatch = item.MALZEME_ADI.toLowerCase().includes(filterM_Adi.toLowerCase()); }
      if (item.MALZEME_ID) { isM_idMatch = String(item.MALZEME_ID).includes(filterM_id); }
      if (item.MALZEME_BIRIM) { isM_birimMatch = item.MALZEME_BIRIM.toLowerCase().includes(filterM_birim.toLowerCase()); }
      if (item.STOK) { isM_stokMatch = String(item.STOK).includes(filterM_stok); }
      if (item.GIDER_ID) { isG_idMatch = String(item.GIDER_ID).includes(filterG_id); }
      if (item.GIDER_TUTAR) { isG_tutarMatch = String(item.GIDER_TUTAR).includes(filterG_tutar); }
      if (item.GIDER_ADI) { isG_adiMatch = item.GIDER_ADI.toLowerCase().includes(filterG_adi.toLowerCase()); }
      if (item.GIDER_TARIH) { isG_tarihMatch = item.GIDER_TARIH.toLowerCase().includes(filterG_tarih.toLowerCase()); }

      return (
        isM_AdiMatch
        && isM_idMatch
        && isM_birimMatch
        && isM_stokMatch
        && isG_idMatch
        && isG_tutarMatch
        && isG_adiMatch
        && isG_tarihMatch
      );
    });

    setFilteredData(filtered);
  }, [
    rows,
    filterM_Adi,
    filterM_id,
    filterM_birim,
    filterM_stok,
    filterG_id,
    filterG_tutar,
    filterG_adi,
    filterG_tarih,
  ]);

  return (
    <div>
      <div className="filters">
        {comp}

        {visibleColumns.includes('MALZEME_ADI') && (
          <input
            type="text"
            placeholder="Filter by MALZEME ADI"
            value={filterM_Adi}
            onChange={(e) => setFilterM_Adi(e.target.value)}
          />
        )}

        {visibleColumns.includes('MALZEME_ID') && (
          <input
            type="text"
            placeholder="Filter by MALZEME ID"
            value={filterM_id}
            onChange={(e) => setFilterM_id(e.target.value)}
          />
        )}

        {visibleColumns.includes('MALZEME_BIRIM') && (
          <input
            type="text"
            placeholder="Filter by MALZEME BIRIMI"
            value={filterM_birim}
            onChange={(e) => setFilterM_birim(e.target.value)}
          />
        )}

        {visibleColumns.includes('STOK') && (
          <input
            type="text"
            placeholder="Filter by MALZEME STOK"
            value={filterM_stok}
            onChange={(e) => setFilterM_stok(e.target.value)}
          />
        )}

        {visibleColumns.includes('GIDER_ID') && (
          <input
            type="text"
            placeholder="Filter by GIDER ID"
            value={filterG_id}
            onChange={(e) => setFilterG_id(e.target.value)}
          />
        )}

        {visibleColumns.includes('GIDER_TUTAR') && (
          <input
            type="text"
            placeholder="Filter by GIDER TUTAR"
            value={filterG_tutar}
            onChange={(e) => setFilterG_tutar(e.target.value)}
          />
        )}

        {visibleColumns.includes('GIDER_ADI') && (
          <input
            type="text"
            placeholder="Filter by GIDER ADI"
            value={filterG_adi}
            onChange={(e) => setFilterG_adi(e.target.value)}
          />
        )}

        {visibleColumns.includes('GIDER_TARIH') && (
          <input
            type="text"
            placeholder="Filter by GIDER TARIHI"
            value={filterG_tarih}
            onChange={(e) => setFilterG_tarih(e.target.value)}
          />
        )}

      </div>

      <table>
        <thead>
          <tr>
            <th> </th>
            {visibleColumns.includes('MALZEME_ADI') && <th>Malzeme Adı</th>}
            {visibleColumns.includes('MALZEME_ID') && <th>Malzeme ID</th>}
            {visibleColumns.includes('MALZEME_BIRIM') && <th>Malzeme Birim</th>}
            {visibleColumns.includes('STOK') && <th>Stok</th>}
            {visibleColumns.includes('GIDER_ID') && <th>Gider ID</th>}
            {visibleColumns.includes('GIDER_TUTAR') && <th>Gider Tutar</th>}
            {visibleColumns.includes('GIDER_ADI') && <th>Gider Adı</th>}
            {visibleColumns.includes('GIDER_TARIH') && <th>Gider Tarihi</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item[unique]}>
              <td> {/* This might need to be adjusted based on your requirements */}</td>
              {visibleColumns.includes('MALZEME_ADI') && <td>{item.MALZEME_ADI}</td>}
              {visibleColumns.includes('MALZEME_ID') && <td>{item.MALZEME_ID}</td>}
              {visibleColumns.includes('MALZEME_BIRIM') && <td>{item.MALZEME_BIRIM}</td>}
              {visibleColumns.includes('STOK') && <td>{item.STOK}</td>}
              {visibleColumns.includes('GIDER_ID') && <td>{item.GIDER_ID}</td>}
              {visibleColumns.includes('GIDER_TUTAR') && <td>{item.GIDER_TUTAR}</td>}
              {visibleColumns.includes('GIDER_ADI') && <td>{item.GIDER_ADI}</td>}
              {visibleColumns.includes('GIDER_TARIH') && <td>{item.GIDER_TARIH}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Add.propTypes = {
  addTo: PropTypes.string.isRequired,
  unique: PropTypes.string.isRequired,
};

FilterableTableList.defaultProps = {
  comp: null,
  manageTo: '/',
  unique: ' ',
  addTo: '/',
};

FilterableTableList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      MALZEME_ADI: PropTypes.string,
      MALZEME_ID: PropTypes.number,
      MALZEME_BIRIM: PropTypes.string,
      STOK: PropTypes.number,
      GIDER_ID: PropTypes.number,
      GIDER_TUTAR: PropTypes.number,
      GIDER_ADI: PropTypes.string,
      GIDER_TARIH: PropTypes.string,
    }),
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  comp: PropTypes.element,
  manageTo: PropTypes.string,
  unique: PropTypes.string,
  addTo: PropTypes.string,
};

export default FilterableTableList;
