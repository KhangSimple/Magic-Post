import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import './Input.css';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
const citySelectItems = [
  { ProvinceName: 'New York', ProviceID: 'NY' },
  { ProvinceName: 'Rome', ProviceID: 'RM' },
  { ProvinceName: 'London', ProviceID: 'LDN' },
  { ProvinceName: 'Istanbul', ProviceID: 'IST' },
  { ProvinceName: 'Paris', ProviceID: 'PRS' },
];
function Input({
  value,
  valueCheck,
  type,
  select = false,
  leftIcon,
  rightIcon,
  placeHolder,
  rightIconClass,
  onClick,
  errorText,
  classes,
  data,
  optionLabel,
  optionValue,
  onChange = () => {},
}) {
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [selected, setSelected] = useState('');
  const handleInput = (inva) => {
    onChange(inva);
    if (inva.length === 0) {
      if (inputValue.length !== 0) {
        setShowError(true);
      }
    } else {
      setShowError(false);
    }
    setInputValue(inva);
    value = inva;
  };
  useEffect(() => {
    if (valueCheck !== undefined) {
      if (inputValue !== valueCheck) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  }, [valueCheck, inputValue]);
  return (
    <React.Fragment>
      <div className={cx('wrapper', { showError })}>
        {leftIcon && <span className={cx('left-input-icon', { showError })}>{leftIcon}</span>}
        {!select && (
          <input
            className={cx(classes)}
            value={inputValue}
            type={type}
            placeholder={placeHolder}
            onChange={(e) => handleInput(e.target.value)}
          />
        )}
        {select && (
          <Dropdown
            className={cx('p-dropdown', 'register-input')}
            optionLabel={optionLabel}
            optionValue={optionValue}
            value={selected}
            options={data}
            onChange={(e) => {
              setSelected(e.value);
              onChange(e.value);
            }}
            placeholder={placeHolder}
          />
        )}
        {!select && rightIcon && (
          <span className={cx('right-input-icon')} onClick={onClick}>
            {rightIcon}
          </span>
        )}
      </div>
      <div className={cx('error')}>
        {!showError && <span className={cx('empty-error')}>&nbsp;</span>}
        {showError && <span className={cx('item-explain-error')}>{errorText}</span>}
      </div>
    </React.Fragment>
  );
}

export default Input;
