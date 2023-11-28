import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CalisanProfile() {
  const location = useLocation();
  const { TC_NO } = location.state;
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3006/api/calisan/calisanlariGetir', { params: { TC_NO } })
      .then((response) => setStudent(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [TC_NO]);

  console.log(student);

  return (
    <div>
      {student && (
        <div>
          <h2>
            {student.ISIM} s Profile
          </h2>
          <p>
            İsim: {student.ISIM}
          </p>
          <p>
            Soyisim: {student.SOYISIM}
          </p>
          <p>
            TC No: {student.TC_NO}
          </p>
          <p>
            Telefon: {student.TEL_NO}
          </p>
          <p>
            Email: {student.E_POSTA}
          </p>
        </div>
      )}
    </div>
  );
}

export default CalisanProfile;
