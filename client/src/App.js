import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import OgrenciPage from './pages/OgrenciProfili';
import OgrencilerPage from './pages/Ogrenciler';
import VeliProfili from './pages/Veli';
import CalisanlarPage from './pages/Calisanlar';
import DerslerPage from './pages/Dersler';

import './style/FilterableTableList.css';

function AnaSayfa() {
  return (
    <center>
      <Link to="/Ogrenciler">
        <button type="button" className="ogrenci-button">
          Öğrenciler
        </button>
      </Link>
      <br />
      <Link to="/Calisanlar">
        <button type="button" className="ogrenci-button">
          Çalışanlar
        </button>
      </Link>
      <Link to="/Dersler">
        <button type="button" className="ogrenci-button">
          Dersler
        </button>
      </Link>
      <Link to="/Subeler">
        <button type="button" className="ogrenci-button">
          Şubeler
        </button>
      </Link>
    </center>
  );
}

function Home() {
  return (
    <div>
      <AnaSayfa />
    </div>
  );
}

function Hello() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Ogrenciler" element={<OgrencilerPage />} />
      <Route path="/OgrenciProfili/" element={<OgrenciPage />} />
      <Route path="/Veli/:TC_NO" element={<VeliProfili />} />
      <Route path="/Calisanlar" element={<CalisanlarPage />} />
      <Route path="/Dersler" element={<DerslerPage />} />
      <Route path="/Subeler" element={<DerslerPage />} />
    </Routes>
  );
}

export default Hello;
