import styles from './DatePickerCustom.module.scss';
import classNames from 'classnames/bind';
import Card from '@mui/material/Card';
import { useState } from 'react';

const cx = classNames.bind(styles);
export default function DatePickerCustom({date, setDate, initValue, max}) {
  return <Card className={cx(styles.wrapper)}>
    <input
      type='date' className={cx(styles.input)}
      value={date}
      max={max}
      onChange={(e)=>{
        console.log(e.target.value);
        setDate(e.target.value);
      }}
      placeholder="dd/mm/yyyy"
    >
    </input>
  </Card>;
}