import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);
function Form({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('bgImg')}></div>
      <div className={cx('main-form')}>{children}</div>
    </div>
  );
}

export default Form;
