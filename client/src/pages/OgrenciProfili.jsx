import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function StudentProfile() {
  const location = useLocation();
  const { TC_NO } = location.state;
  const [student, setStudent] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir', { params: { TC_NO } })
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

      {schedule && (
        <div>
          <h2>Ders Programı</h2>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Pazartesi</th>
                <th>Salı</th>
                <th>Çarşamba</th>
                <th>Perşembe</th>
                <th>Cuma</th>
                <th>Cumartesi</th>
                <th>Pazar</th>
              </tr>
            </thead>
            <MyBody />
          </table>
        </div>
      )}
    </div>
  );
}

function MyBody() {
  const rows = [];
  for (let i = 1; i <= 10; i += 1) {
    rows.push(i);
  }
  return (<tbody rows={rows} />);
}

export default StudentProfile;
