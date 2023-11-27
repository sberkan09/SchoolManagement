import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import PropTypes from 'prop-types';
import ComboBox3 from './ComboBox3';
import ComboBox4 from './ComboBox4';
import BasicDatePicker from './BasicDatePicker';

function AppointmentPanel(props) {
  const { tcno } = props.user;
  const navigate = useNavigate();
  const [randevuIsmi, setRandevuIsmi] = useState('');
  const [tarih, setTarih] = useState({});
  const [hastaneler, setHastaneler] = useState([]);
  const [hastane, setHastane] = useState('');
  const [doktorlar, setDoktorlar] = useState([]);
  const [doktorTc, setDoktorTc] = useState('');
  const [saat, setSaat] = useState('');
  const [openPanel, setOpenPanel] = useState(false);

  function cancel() {
    navigate('/appointments', { replace: true });
  }

  async function save() {
    const data = await axios.get('/randevu', {
      params: {
        kullanicitc: tcno, doktortc: doktorTc, tarih: tarih.toLocaleDateString('tr-TR').replaceAll('.', '-'), saat,
      },
    }).then((res) => res.data[0]);
    if (data !== undefined) {
      setOpenPanel(true);
    } else {
      await axios.put('/randevularim', {
        kullanicitc: tcno, doktortc: doktorTc, randevuismi: randevuIsmi, tarih, saat,
      }).then(() => { navigate('/appointments', { replace: true }); });
    }
  }
  function handleChangeRandevu(event) {
    setRandevuIsmi(event.target.value);
  }

  function handleSaatChange(event) {
    setSaat(event.target.value);
  }
  function handleClose() {
    setOpenPanel(false);
  }

  useEffect(() => {
    (async () => await axios.get('/api/hastaneler'))().then((data) => {
      setHastaneler(data.data);
    });
  }, []);

  useEffect(() => {
    async function getdoktor(hastaneid) {
      return await axios.get('/api/doktorlar', { params: { hastaneid } });
    }
    if (hastaneler.length !== 0) {
      getdoktor(hastane).then((data) => {
        setDoktorlar(data.data);
      });
    }
  }, [hastane]);

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
        <Paper variant="outlined" elevation={0}>
          <TextField
            id="filled-basic"
            label="Randevu İsmi"
            variant="filled"
            sx={{
              width: '10cm',
              position: 'relative',
              top: '1cm',
              left: '10.3cm',
            }}
            onChange={handleChangeRandevu}
          />
          <div
            style={{
              width: '10cm',
              position: 'relative',
              top: '5cm',
              left: '0.8cm',
            }}
          >
            <ComboBox3
              name="Hastane Seç"
              values={hastaneler}
              setHastane={setHastane}
            />
          </div>
          <div
            style={{
              width: '7cm',
              position: 'relative',
              top: '3.5cm',
              left: '11.4cm',
            }}
          >
            <ComboBox4 name="Doktor Seç" values={doktorlar} setDoktorTc={setDoktorTc} />
          </div>
          <div
            style={{
              width: '7cm',
              position: 'relative',
              top: '2cm',
              left: '19cm',
            }}
          >
            <BasicDatePicker tarih={tarih} setTarih={setTarih} />
          </div>
          <TextField
            id="time"
            label="Saat Seç"
            type="time"
            defaultValue="--:--"
            onChange={handleSaatChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{
              width: 150,
              position: 'relative',
              left: '26.2cm',
              top: '0.5cm',
            }}
          />
          <div style={{
            position: 'relative', top: '7cm', left: '11.5cm', width: '10cm',
          }}
          >
            <Button variant="contained" color="success" sx={{ margin: '1cm' }} onClick={() => { save(); }}>
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
      <Dialog
        open={openPanel}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>UYARI</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Aynı doktordan aynı saatte birden fazla randevu alınamaz
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>TAMAM</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AppointmentPanel.propTypes = {
  user: PropTypes.object,
};

AppointmentPanel.defaultProps = {
  user: {},
};

export default AppointmentPanel;
