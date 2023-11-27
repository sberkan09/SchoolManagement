import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

function BasicDatePicker(props) {
  const { tarih, setTarih } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Tarih Seç"
        value={tarih}
        onChange={(newValue) => {
          setTarih(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        disablePast
      />
    </LocalizationProvider>
  );
}

BasicDatePicker.propTypes = {
  tarih: PropTypes.object,
  setTarih: PropTypes.func,
};

BasicDatePicker.defaultProps = {
  tarih: {},
  setTarih: () => {},
};

export default BasicDatePicker;
