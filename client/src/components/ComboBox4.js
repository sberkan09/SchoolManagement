import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

function ComboBox4(props) {
  const { name, values, setDoktorTc } = props;
  const [item, setItem] = useState('');

  const handleChange = (event) => {
    const tc = event.target.value.slice(event.target.value.indexOf('|') + 1);
    setItem(event.target.value);
    setDoktorTc(tc);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Doktor Seç</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label={name}
          onChange={handleChange}
        >
          {values.map((value) => (
            <MenuItem key={value} value={`${value.doktorad}|${value.tcno}`}>{`${value.doktorad} ${value.doktorsoyad}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

ComboBox4.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  setDoktorTc: PropTypes.func,
};

ComboBox4.defaultProps = {
  name: '',
  values: [],
  setDoktorTc: () => {},
};

export default ComboBox4;
