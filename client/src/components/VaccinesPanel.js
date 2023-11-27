import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import ComboBoxVaccines from './ComboBoxVaccines';
import BasicDatePicker from './BasicDatePicker';

function VaccinesPanel(props) {
  const { tcno } = props.user;
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [asiid, setAsiId] = useState('');
  const [tarih, setTarih] = useState({});

  useEffect(() => {
    async function makeComboBoxReady() {
      const promise1 = axios.get('/api/asilar');
      const promise2 = axios.get('/asilarim', { params: { tcno } });
      const newRows = [];
      let data1 = [];
      let data2 = [];
      await promise1.then((res) => { data1 = res.data; });
      await promise2.then((res) => { data2 = res.data; });
      for (let i = 0; i < data1.length; i += 1) {
        let found = false;
        for (let j = 0; j < data2.length; j += 1) {
          if (data2[j].asiid === data1[i].asiid) {
            found = true;
            break;
          }
        }
        if (!found) {
          newRows.push(data1[i]);
        }
      }
      return newRows;
    }
    makeComboBoxReady().then((res) => { setRows(res); });
  }, []);

  function cancel() {
    navigate('/vaccines', { replace: true });
  }

  async function save() {
    if (asiid !== '') {
      const tarih_tomorrow = new Date(tarih.getTime() + (24 * 60 * 60 * 1000));
      await axios.post('/asilarim', {
        tcno, asiid, yapilacagitarih: tarih_tomorrow,
      }).then(() => { navigate('/vaccines', { replace: true }); });
    }
  }
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 2,
            width: 1220,
            height: 650,
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
          },
        }}
      >
        <Paper variant="outlined" elevation={6}>
          <div
            style={{
              width: '10cm',
              position: 'relative',
              top: '5cm',
              left: '5cm',
            }}
          >
            <ComboBoxVaccines
              name="Aşı Seçiniz"
              values={rows}
              setSelectedItem={setAsiId}
            />
            <div style={{ position: 'relative', left: '13cm', bottom: '1.5cm' }}>
              <BasicDatePicker tarih={tarih} setTarih={setTarih} />
            </div>
          </div>
          <div style={{
            position: 'relative', top: '10cm', left: '11.5cm', width: '10cm',
          }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ margin: '1cm' }}
              onClick={() => { save(); }}
            >
              Kaydet
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: '1cm' }}
              onClick={() => { cancel(); }}
            >
              İptal
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
VaccinesPanel.propTypes = {
  user: PropTypes.object,
};

VaccinesPanel.defaultProps = {
  user: {},
};

export default VaccinesPanel;
