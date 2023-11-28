import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OgretmenEkle from './OgretmenEkle';

function CalisanEkle() {
  return (
    <>
      <Link to="/OgretmenEkle">Öğretmen Ekle</Link>
      <Link to="/TemizlikciEkle">Temizlikçi Ekle</Link>;
    </>
  );
}

export default CalisanEkle;
