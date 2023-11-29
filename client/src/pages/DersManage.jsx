import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TableList from '../components/TableList';

function objToArr(rows) {
  const allowedAttributes = ['SUBE_ID', 'GUN', 'DERS_NO', 'SINIF', 'SUBE_NO'];
  if (Array.isArray(rows)) {
    return rows;
  }
  const arr = [];
  arr[0] = rows;
  return arr;
}

function DersManage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unique } = location.state;
  const [rows, setRows] = useState([]);
  const DERS_ID = unique;
  const [ders, setDers] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3006/api/ders/tumDersleriGetir', { params: { DERS_ID } })
      .then((response) => setDers(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [DERS_ID]);

  useEffect(() => {
    axios.get('http://localhost:3006/api/ders/subeleriGetir', { params: { DERS_ID: parseInt(DERS_ID, 10) } })
      .then((response) => setRows(objToArr(response.data[0])))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [DERS_ID]);

  return (
    <>
      <div>
        <p>Ders Id: {ders.DERS_ID}</p>
        <p>Ders Saati: {ders.DERS_SAATI}</p>
        <p>Aktif Mi: {ders.AKTIF_MI}</p>
      </div>
      <TableList rows={rows} manageTo="/SubeManage" visibleColumns={['SUBE_ID', 'GUN', 'DERS_NO', 'SINIF', 'SUBE_NO']} unique="SUBE_ID" addTo="/SubeEkle/" />
    </>
  );
}

export default DersManage;
