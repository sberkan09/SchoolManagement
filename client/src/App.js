import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import OgrenciPage from './pages/Ogrenci';
import OgrencilerPage from './pages/Ogrenciler';
import VeliProfili from './pages/Veli';

function Ogrenci() {
  return (
    <center>
      <Link to="/Ogrenciler">
        <button type="button">
          Öğrenciler
        </button>
      </Link>
      <br />
    </center>
  );
}

function Home() {
  return (
    <div>
      <Ogrenci />
    </div>
  );
}

function Hello() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Ogrenciler" element={<OgrencilerPage />} />
      <Route path="/Ogrenci/:TC_NO" element={<OgrenciPage />} />
      <Route path="/Veli/:TC_NO" element={<VeliProfili />} />
    </Routes>
  );
}

export default Hello;
