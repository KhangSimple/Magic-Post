import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function SelectSmall({data, label, defaultValue, category, setCategory }) {
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="select-small-label">{label}</InputLabel>
      <Select
        labelId="select-small-label"
        id="demo-select-small"
        value={category}
        label={label}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {data.map((item)=>{
          return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}
export default SelectSmall;