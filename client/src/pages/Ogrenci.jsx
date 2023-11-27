import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Ogrenci() {
  const { TC_NO } = useParams();

  return (
    <div>
      TC No is {TC_NO}
    </div>
  );
}

function OgrenciPage() {
  return (
    <div>
      <Ogrenci />
    </div>
  );
}

export default OgrenciPage;
