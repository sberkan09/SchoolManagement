import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function StudentProfile(props) {
  const { TC_NO } = props;
  const [student, setStudent] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir', { params: { TC_NO } })
      .then((response) => setStudent(response.data))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [TC_NO]);

  return (
    <div>
      {student && (
        <div>
          <h2>
            {student.name}
            &apos;s Profile
          </h2>
          <p>
            İsim:
            {student.name}
          </p>
          <p>
            Soyisim:
            {student.surname}
          </p>
          <p>
            TC No:
            {student.TC_NO}
          </p>
          <p>
            Telefon:
            {student.phone}
          </p>
          <p>
            Email:
            {student.email}
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

StudentProfile.defaultProps = {
  TC_NO: '',
};

StudentProfile.propTypes = {
  TC_NO: PropTypes.string,
};

export default StudentProfile;
