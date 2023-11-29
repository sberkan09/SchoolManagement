import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function DersManage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unique, visibleColumns } = location.state;
  const [student, setStudent] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    console.log(unique);
    axios.get('http://localhost:3006/api/ders/dersiGetir', { params: { DERS_ID: parseInt(unique, 10) } })
      .then((response) => setStudent(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [unique]);

  return (
    <div>
      {student && (
        <div>
          <h2>{student.DERS_ADI}</h2>
          <p>Ders Id: {student.DERS_ID}</p>
          <p>Ders Adı: {student.DERS_ADI}</p>
          <p>Ders Saati: {student.DERS_SAATI}</p>
          <p>Aktif Mi: {student.AKTIF_MI ? 'Aktif' : 'Değil'}</p>
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
            <tbody>
              {schedule.map((item, index) => (
                <tr key={item.TC_NO}>
                  <td>Saat {index + 1}</td>
                  <td>{item.GUN === '1' && item.DERS_NO}</td>
                  <td>{item.GUN === '2' && item.DERS_NO}</td>
                  <td>{item.GUN === '3' && item.DERS_NO}</td>
                  <td>{item.GUN === '4' && item.DERS_NO}</td>
                  <td>{item.GUN === '5' && item.DERS_NO}</td>
                  <td>{item.GUN === '6' && item.DERS_NO}</td>
                  <td>{item.GUN === '7' && item.DERS_NO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default DersManage;
