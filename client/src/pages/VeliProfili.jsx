import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TableList from '../components/TableList';

function VeliProfile() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { TC_NO, visibleColumns } = location.state;
  const [veli, setVeli] = useState(null);
  const [editedVeli, setEditedVeli] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3006/api/veli/veliGetir', { params: { TC_NO } })
      .then((response) => setVeli(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [TC_NO]);

  useEffect(() => {
    // Fetch data for 'ogrenciler' and update the state
    axios.get('http://localhost:3006/api/veli/ogrencileriGetir')
      .then((response) => setRows(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  const handleInputChange = (fieldName, value) => {
    if (value.length !== 0) {
      setEditedVeli((prevVeli) => ({
        ...prevVeli,
        [fieldName]: value,
      }));
    } else {
      setEditedVeli((prevVeli) => ({
        ...prevVeli,
        [fieldName]: ' ',
      }));
    }
  };

  const handleUpdateVeli = async () => {
    console.log(editedVeli);
    try {
      const response = await axios.get('http://localhost:3006/api/veli/guncelle', {
        params: {
          TC_NO: editedVeli.TC_NO, ISIM: editedVeli.ISIM, SOYISIM: editedVeli.SOYISIM, ADRES: editedVeli.ADRES, TEL_NO: editedVeli.TEL_NO, E_POSTA: editedVeli.E_POSTA,
        },
      });

      // Handle the response as needed, e.g., show a success message or reset the form
      console.log('Veli updated successfully:', response.data);
      navigate(0);
    } catch (error) {
      console.error('Error updating Veli:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleEditBtn = async () => {
    setIsEditing(true);
    setEditedVeli(veli);
  };

  return (
    <div>
      {veli && (
        <div>
          <h2>{veli.ISIM}s Profile</h2>
          <TableList
            visibleColumns={['ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'OTC_NO', 'TC_NO']}
            unique="TC_NO"
            addTo="/VeliEkle/"
          />
          {isEditing ? (
            <>
              <label htmlFor="isim">
                İsim:
                <input
                  id="isim"
                  type="text"
                  value={editedVeli.ISIM || veli.ISIM}
                  onChange={(e) => handleInputChange('ISIM', e.target.value)}
                />
              </label>

              <label htmlFor="soyisim">
                Soyisim:
                <input
                  id="soyisim"
                  type="text"
                  value={editedVeli.SOYISIM || veli.SOYISIM}
                  onChange={(e) => handleInputChange('SOYISIM', e.target.value)}
                />
              </label>

              <label htmlFor="adres">
                Adres:
                <input
                  id="adres"
                  type="text"
                  value={editedVeli.ADRES || veli.ADRES}
                  onChange={(e) => handleInputChange('ADRES', e.target.value)}
                />
              </label>

              <label htmlFor="tel_no">
                Telefon:
                <input
                  id="tel_no"
                  type="text"
                  value={editedVeli.TEL_NO || veli.TEL_NO}
                  onChange={(e) => handleInputChange('TEL_NO', e.target.value)}
                />
              </label>

              <label htmlFor="e_posta">
                Email:
                <input
                  id="e_posta"
                  type="text"
                  value={editedVeli.E_POSTA || veli.E_POSTA}
                  onChange={(e) => handleInputChange('E_POSTA', e.target.value)}
                />
              </label>
              <button type="button" onClick={handleUpdateVeli}>Güncelle</button>
              <button type="button" onClick={(e) => { setIsEditing(false); }}>İptal</button>
            </>
          ) : (
            <>
              <p>İsim: {veli.ISIM}</p>
              <p>Soyisim: {veli.SOYISIM}</p>
              <p>Adres: {veli.ADRES}</p>
              <p>TC No: {veli.TC_NO}</p>
              <p>Telefon: {veli.TEL_NO}</p>
              <p>Email: {veli.E_POSTA}</p>
              <button type="button" onClick={handleEditBtn}>Veli Bilgilerini Güncelle</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VeliProfile;
