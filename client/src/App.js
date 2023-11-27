import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import OgrenciPage from './pages/Ogrenci';

function Ogrenci() {
  return (
    <center>
      <Link to="/Ogrenci">
        <button type="button">
          Öğrenci
        </button>
      </Link>
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
      <Route path="/Ogrenci" element={<OgrenciPage />} />
    </Routes>
  );
}

export default Hello;
