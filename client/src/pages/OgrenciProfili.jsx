import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TableList from '../components/TableList';

let count = 0;

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

function Musait(prop) {
  const { TC_NO, DERS_NO, GUN } = prop;
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const MusaitlikProgram = Array.from({ length: 10 }, () => new Array(7).fill(0));

  const refresh = async () => {
    const fetchData = async () => {
      await axios.get('http://localhost:3006/api/ogrenci/ogrenciMusaitlikGetir', {
        params: {
          TC_NO: TC_NO,
        },
      }).then((response) => {
        setRows(response.data);
      });
    };
    fetchData();
    rows.forEach((element) => {
      MusaitlikProgram[element.DERS_NO][element.GUN] = 'Müsait';
    });
    console.log('MP', MusaitlikProgram);
  };

  if (count !== 5) {
    rows.forEach((element) => {
      MusaitlikProgram[element.DERS_NO][element.GUN] = 'Müsait';
    });
    console.log('MP', MusaitlikProgram);
    count += 1;
  }

  return (
    <>
      {(MusaitlikProgram[DERS_NO - 1][GUN - 1] === 'Müsait') && (
        <>
          Müsait
        </>
      )}

      {(MusaitlikProgram[DERS_NO - 1][GUN - 1] !== 'Müsait') && (
        <MusaitOl TC_NO={TC_NO} DERS_NO={DERS_NO} GUN={GUN} />
      )}
    </>
  );
}

function MusaitOl(prop) {
  const { TC_NO, DERS_NO, GUN } = prop;
  const navigate = useNavigate();
  const handleUpdateStudent = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ogrenci/MusaitlikEkle', {
        params: {
          TC_NO: TC_NO, GUN: GUN, DERS_NO: DERS_NO,
        },
      });

      // Handle the response as needed, e.g., show a success message or reset the form
      console.log('Ogrenci updated successfully:', response.data);
      navigate(0);
    } catch (error) {
      console.error('Error updating Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  return (
    <button type="button" onClick={handleUpdateStudent}>
      Müsait Ol
    </button>
  );
}

function DersTalepEt(TC_NO, DERS_ID) {
  count = 0;
  const navigate = useNavigate();
  const handleUpdateStudent = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ogrenci/dersTalepEt', {
        params: {
          TC_NO: TC_NO, DERS_ID: DERS_ID,
        },
      });

      // Handle the response as needed, e.g., show a success message or reset the form
      console.log('Ogrenci updated successfully:', response.data);
      navigate(0);
    } catch (error) {
      console.error('Error updating Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  return (
    <button type="button" onClick={handleUpdateStudent}>
      Talep Et
    </button>
  );
}

function Dersler() {
  const [rows, setRows] = React.useState([]);
  const [dersType, setDersType] = useState('aktif');
  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/ders/kapaliDersGetir').then((response) => {
        setRows(response.data);
      });
    }());
  }, []);

  return <TableList rows={rows} visibleColumns={['DERS_ID', 'DERS_ADI', 'DERS_SAATI', 'DERS TALEP']} manageTo="/DersManage/" unique="DERS_ID" addTo="/DersEkle/" compAfter={<DersTalepEt />} />;
}

function StudentProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unique, visibleColumns } = location.state;
  const [student, setStudent] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [editedStudent, setEditedStudent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDersTalep, setisDersTalep] = useState(false);
  const TC_NO = unique;
  useEffect(() => {
    axios.get('http://localhost:3006/api/ogrenci/ogrencileriGetir', { params: { TC_NO: TC_NO } })
      .then((response) => setStudent(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [TC_NO]);

  const programTemplate = [];
  for (let i = 0; i < 10; i += 1) {
    programTemplate[i] = [];
    for (let j = 0; j < 7; j += 1) {
      programTemplate[i][j] = { DERS_NO: i + 1, GUN: j + 1 };
    }
  }

  const handleInputChange = (fieldName, value) => {
    if (value.length !== 0) {
      setEditedStudent((prevStudent) => ({
        ...prevStudent,
        [fieldName]: value,
      }));
    } else {
      setEditedStudent((prevStudent) => ({
        ...prevStudent,
        [fieldName]: ' ',
      }));
    }
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
      navigate(0);
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
              <button type="button" onClick={handleUpdateStudent}>Güncelle</button>
              <button type="button" onClick={(e) => { setIsEditing(false); }}>İptal</button>
            </>
          ) : (
            <>
              <p>İsim: {student.ISIM}</p>
              <p>Soyisim: {student.SOYISIM}</p>
              <p>Adres: {student.ADRES}</p>
              <p>TC No: {student.TC_NO}</p>
              <p>Telefon: {student.TEL_NO}</p>
              <p>Email: {student.E_POSTA}</p>
              <button type="button" onClick={handleEditBtn}>Öğrenci Bilgilerini Güncelle</button>
              {!isDersTalep && (
                <button type="button" onClick={(e) => setisDersTalep(true)}>Ders Talep Et</button>
              )}

              {isDersTalep && (
                <>
                  <button type="button" onClick={(e) => setisDersTalep(false)}>Ders Talep İptal</button>
                  <Dersler />
                </>
              )}
            </>
          )}
        </div>
      )}

      {!isDersTalep && schedule && (
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
              {programTemplate.map((item, index) => (
                <tr key={item[0].DERS_NO}>
                  <td>Saat {item[0].DERS_NO}</td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[0].DERS_NO} GUN={item[0].GUN} /></td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[1].DERS_NO} GUN={item[1].GUN} /></td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[2].DERS_NO} GUN={item[2].GUN} /></td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[3].DERS_NO} GUN={item[3].GUN} /></td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[4].DERS_NO} GUN={item[4].GUN} /></td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[5].DERS_NO} GUN={item[5].GUN} /></td>
                  <td><Musait TC_NO={TC_NO} DERS_NO={item[6].DERS_NO} GUN={item[6].GUN} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default StudentProfile;
