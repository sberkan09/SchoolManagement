import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import OgrenciPage from './pages/OgrenciProfili';
import OgrencilerPage from './pages/Ogrenciler';
import VeliProfili from './pages/Veli';
import CalisanlarPage from './pages/Calisanlar';
import DerslerPage from './pages/Dersler';

function AnaSayfa() {
  return (
    <center>
      <Link to="/Ogrenciler">
        <button type="button">
          Öğrenciler
        </button>
      </Link>
      <br />
      <Link to="/Calisanlar">
        <button type="button">
          Çalışanlar
        </button>
      </Link>
      <Link to="/Dersler">
        <button type="button">
          Dersler
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
    </Routes>
  );
}

export default Hello;
