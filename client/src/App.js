import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import OgrenciPage from './pages/OgrenciProfili';
import OgrencilerPage from './pages/Ogrenciler';
import VeliProfili from './pages/Veli';
import CalisanlarPage from './pages/Calisanlar';
import DerslerPage from './pages/Dersler';
import CalisanPage from './pages/CalisanProfili';
import SubelerPage from './pages/Subeler';
import DersManage from './pages/DersManage';
import CalisanEkle from './pages/CalisanEkle';
import OgrenciEkle from './pages/OgrenciEkle';
import DersEkle from './pages/DersEkle';
import GiderlerPage from './pages/Giderler';
import MalzemelerPage from './pages/Malzemeler';

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
      <Link to="/Giderler">
        <button type="button" className="ogrenci-button">
          Giderler
        </button>
      </Link>
      <Link to="/Malzemeler">
        <button type="button" className="ogrenci-button">
          Malzemeler
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
      <Route path="/OgrenciEkle/" element={<OgrenciEkle />} />
      <Route path="/Veli/:TC_NO" element={<VeliProfili />} />
      <Route path="/Calisanlar" element={<CalisanlarPage />} />
      <Route path="/CalisanProfili" element={<CalisanPage />} />
      <Route path="/CalisanEkle" element={<CalisanEkle />} />
      <Route path="/Dersler" element={<DerslerPage />} />
      <Route path="/DersEkle" element={<DersEkle />} />
      <Route path="/Subeler" element={<SubelerPage />} />
      <Route path="/DersManage" element={<DersManage />} />
      <Route path="/Giderler" element={<GiderlerPage />} />
      <Route path="/Malzemeler" element={<MalzemelerPage />} />
    </Routes>
  );
}

export default Hello;
