import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OgretmenEkle from './OgretmenEkle';
import IdareciEkle from './IdareciEkle';

function CalisanEkle() {
  return (
    <>
      <Link to="/OgretmenEkle"><button type="button">Öğretmen Ekle</button></Link>
      <br />
      <Link to="/TemizlikciEkle"><button type="button">Temizlik Görevlisi Ekle</button></Link>
      <br />
      <Link to="/IdareciEkle"><button type="button">İdareci Ekle</button></Link>
    </>
  );
}

export default CalisanEkle;
