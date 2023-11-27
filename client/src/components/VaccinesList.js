import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const today = new Date();

function VaccinesList(props) {
  const {
    asiadi, yapilmayasi, yapilacagitarih, setRows, tcno, asiid, yaptirdi_mi,
  } = props;
  const [checked, setChecked] = useState(yaptirdi_mi === 1);
  const [openPanel, setOpenPanel] = useState(false);

  function formatDate(formatdate) {
    const formatedDate = new Date(formatdate);
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
    };
    return formatedDate.toLocaleDateString('tr-TR', options);
  }
  function handleChange(e) {
    if (e.target.checked) { setOpenPanel(true); }
  }
  function handleClose() {
    setOpenPanel(false);
  }
  async function handleAccept() {
    await axios.put('/asilarim', {
      tcno, asiid, yapilacagitarih, yaptirdi_mi: yaptirdi_mi === 0 ? 1 : 0,
    }).then(() => {
      handleClose();
      setChecked(true);
      setRows((prevRows) => {
        const newRows = [...prevRows];
        console.log(newRows);
        for (let i = 0; i < newRows.length; i += 1) {
          if (newRows[i].tcno === tcno && newRows[i].asiid === asiid && newRows[i].yapilacagitarih === yapilacagitarih) {
            newRows[i].yaptirdi_mi = 1;
            break;
          }
        }
        return newRows;
      });
    });
  }

  return (
    <StyledTableRow key={asiadi} style={{ backgroundColor: checked ? '#7cf87c' : (today <= new Date(yapilacagitarih) ? '#f8f87c' : '#f8baba') }}>

      <StyledTableCell component="th" scope="row" align="left">
        {asiadi}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="center">
        {formatDate(yapilacagitarih)}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="center">
        {yapilmayasi}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="right" sx={{ paddingRight: '1.5cm' }}>
        <Checkbox checked={checked} onChange={handleChange} disabled={checked} />
      </StyledTableCell>
      <div>
        <Dialog
          open={openPanel}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>UYARI</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Bu işlem geri alınamaz
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>KAPAT</Button>
            <Button onClick={handleAccept}>TAMAM</Button>
          </DialogActions>
        </Dialog>
      </div>
    </StyledTableRow>
  );
}

VaccinesList.propTypes = {
  yapilmayasi: PropTypes.number,
  asiadi: PropTypes.object,
  yapilacagitarih: PropTypes.instanceOf(Date),
  setRows: PropTypes.func,
  tcno: PropTypes.string,
  asiid: PropTypes.string,
  yaptirdi_mi: PropTypes.number,
};

VaccinesList.defaultProps = {
  yapilmayasi: 0,
  asiadi: '',
  yapilacagitarih: {},
  setRows: () => {},
  tcno: '',
  asiid: '',
  yaptirdi_mi: 0,
};

export default VaccinesList;
