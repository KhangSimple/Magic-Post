import styles from './InfoTitle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const InfoTitle = ({ children }) => {
  return <div className={cx(styles.infoTitle)}>| {children}</div>;
};
export default InfoTitle;
