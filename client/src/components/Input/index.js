import classNames from 'classnames/bind';
import { Routes, Route, Link } from 'react-router-dom';
import styles from './Input.module.scss';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Input({ type, leftIcon, rightIcon, placeHolder, rightIconClass, onClick }) {
  return (
    <div className={cx('wrapper')}>
      {leftIcon && <span className={cx('left-input-icon')}>{leftIcon}</span>}
      <input type={type} placeholder={placeHolder} />
      {rightIcon && (
        <span className={cx('right-input-icon')} onClick={onClick}>
          {rightIcon}
        </span>
      )}
    </div>
  );
}

export default Input;
