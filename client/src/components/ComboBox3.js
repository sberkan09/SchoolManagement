import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

function ComboBox3(props) {
  const { name, values, setHastane } = props;
  const [item, setItem] = useState('');

  const handleChange = (event) => {
    setItem(event.target.value);
    setHastane(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hastane Seç</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label={name}
          onChange={handleChange}
        >
          {values.map((value) => (
            <MenuItem key={value} value={value.hastaneid}>{value.hastanead}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

ComboBox3.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  setHastane: PropTypes.func,
};

ComboBox3.defaultProps = {
  name: '',
  values: [],
  setHastane: () => {},
};

export default ComboBox3;
