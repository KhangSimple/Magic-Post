import DatePickerCustom from '~/components/DatePickerCustom/DatePickerCustom';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

function getCurrentTime() {
  return new Date().toISOString().substring(0, 10);
}

const DatePickerRange = ({startDate, setStartDate, endDate, setEndDate})=>{
  console.log(startDate, endDate);
  return <Grid container  sx={{
    width: '100%',
    justifyContent: 'end',
  }} spacing={3}>
    <Grid xs={12} sm={12} md={6} sx={{
      display: 'flex',
      justifyContent: 'end',
    }}>
      <DatePickerCustom
        date={startDate}
        setDate={setStartDate}
        max = {
          new Date().toISOString().substring(0, 10)
        }
      >
      </DatePickerCustom>
      <DatePickerCustom
        date={endDate}
        setDate={setEndDate}
        max={new Date().toISOString().substring(0, 10)}
      >
      </DatePickerCustom>
    </Grid>

  </Grid>
}
export default DatePickerRange;