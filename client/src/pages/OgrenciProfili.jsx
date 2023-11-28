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
      const response = await axios.get('http://localhost:3006/api/ogrenci/aktifOgrenciSil', { params: { TC_NO } });

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
  const [editedStudent, setEditedStudent] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (fieldName, value) => {
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [fieldName]: value,
    }));
  };

  const handleUpdateStudent = async () => {
    console.log(editedStudent);
    try {
      const response = await axios.get('http://localhost:3006/api/ogrenci/guncelle', {
        params: {
          TC_NO: editedStudent.TC_NO, ISIM: editedStudent.ISIM, SOYISIM: editedStudent.SOYISIM, ADRES: editedStudent.ADRES, TEL_NO: editedStudent.TEL_NO, E_POSTA: editedStudent.E_POSTA,
        },
      });

      // Handle the response as needed, e.g., show a success message or reset the form
      console.log('Ogrenci updated successfully:', response.data);
      setIsEditing(false);
      setStudent(response.data);
    } catch (error) {
      console.error('Error updating Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleEditBtn = async () => {
    setIsEditing(true);
    setEditedStudent(student);
  };

  return (
    <div>
      {student && (
        <div>
          {!visibleColumns.includes('MEZUNIYET_TARIHI') && <Delete TC_NO={TC_NO} />}
          <h2>{student.ISIM}s Profile</h2>

          {isEditing ? (
            <>
              <label htmlFor="isim">
                İsim:
                <input
                  id="isim"
                  type="text"
                  value={editedStudent.ISIM || student.ISIM}
                  onChange={(e) => handleInputChange('ISIM', e.target.value)}
                />
              </label>

              <label htmlFor="soyisim">
                Soyisim:
                <input
                  id="soyisim"
                  type="text"
                  value={editedStudent.SOYISIM || student.SOYISIM}
                  onChange={(e) => handleInputChange('SOYISIM', e.target.value)}
                />
              </label>

              <label htmlFor="adres">
                Adres:
                <input
                  id="adres"
                  type="text"
                  value={editedStudent.ADRES || student.ADRES}
                  onChange={(e) => handleInputChange('ADRES', e.target.value)}
                />
              </label>

              <label htmlFor="tel_no">
                Telefon:
                <input
                  id="tel_no"
                  type="text"
                  value={editedStudent.TEL_NO || student.TEL_NO}
                  onChange={(e) => handleInputChange('TEL_NO', e.target.value)}
                />
              </label>

              <label htmlFor="e_posta">
                Email:
                <input
                  id="e_posta"
                  type="text"
                  value={editedStudent.E_POSTA || student.E_POSTA}
                  onChange={(e) => handleInputChange('E_POSTA', e.target.value)}
                />
              </label>
              <button type="button" onClick={handleUpdateStudent}>Update</button>
            </>
          ) : (
            <>
              <p>İsim: {student.ISIM}</p>
              <p>Soyisim: {student.SOYISIM}</p>
              <p>Adres: {student.ADRES}</p>
              <p>TC No: {student.TC_NO}</p>
              <p>Telefon: {student.TEL_NO}</p>
              <p>Email: {student.E_POSTA}</p>
              <button type="button" onClick={handleEditBtn}>Edit</button>
            </>
          )}
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

function MyBody() {
  const rows = [];
  for (let i = 1; i <= 10; i += 1) {
    rows.push(i);
  }
  return <tbody rows={rows} />;
}

export default StudentProfile;
