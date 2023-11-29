import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

function ComboBox2(props) {
  const [item, setItem] = useState(1);

  const handleChange = (event) => {
    setItem(event.target.value);
    props.setSelectedSiklik(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label={props.name}
          onChange={handleChange}
        >
          {props.values.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
}

ComboBox2.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  setSelectedSiklik: PropTypes.func,
};

ComboBox2.defaultProps = {
  name: '',
  values: [],
  setSelectedSiklik: () => {},
};

export default ComboBox2;