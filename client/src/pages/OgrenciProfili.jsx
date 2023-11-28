import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Edit() {
  return <> </>;
}

function Delete(TC_NO) {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ogrenci/aktifOgrenciSil', { params: TC_NO });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Ogrenci deleted successfully:', response.data);
      navigate('/Ogrenciler');
    } catch (error) {
      console.error('Error deleting Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  if (isDelete) {
    handleDeleteOgrenci();
  }
  return (
    <button type="button" onClick={() => setIsDelete(true)}>
      Delete
    </button>
  );
}

function StudentProfile() {
  const location = useLocation();
  const { TC_NO, visibleColumns } = location.state;
  const [student, setStudent] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir', { params: { TC_NO } })
      .then((response) => setStudent(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [TC_NO]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'http://localhost:3006/api/ogrenci/mezunOgrencileriGetir';
      try {
        const response = await axios.get(endpoint);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {student && (
        <div>
          {!visibleColumns.includes('MEZUNIYET_TARIHI') && <Delete TC_NO={TC_NO} />}
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
