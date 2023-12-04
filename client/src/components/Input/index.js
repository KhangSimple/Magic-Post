import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

function Input({
  value,
  type,
  leftIcon,
  rightIcon,
  placeHolder,
  rightIconClass,
  onClick,
  errorText,
  classes,
  onChange = () => {},
}) {
  // console.log(placeHolder, ' ', type);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
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
  return (
    <React.Fragment>
      <div className={cx('wrapper', { showError })}>
        {leftIcon && <span className={cx('left-input-icon', { showError })}>{leftIcon}</span>}
        <input
          className={cx(classes)}
          value={inputValue}
          type={type}
          placeholder={placeHolder}
          onChange={(e) => handleInput(e.target.value)}
        />
        {rightIcon && (
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
