import styles from './SubSection.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const SubSection = ({ textLeft, textLeftBold }) => {
  return (
    <div className={cx(styles.subSection)}>
      <div className={cx(styles.textLeft)}>{textLeft}</div>
      <div className={cx(styles.textLeft, styles.bold)}>{textLeftBold}</div>
    </div>
  );
};

export default SubSection;
