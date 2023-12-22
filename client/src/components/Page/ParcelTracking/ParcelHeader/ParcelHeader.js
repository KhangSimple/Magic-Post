import styles from './ParcelHeader.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
const cx = classNames.bind(styles);

const ParcelHeader = () => {
  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.paneTop)}>
        <p className={cx(styles.p1, styles.bold)}>Mã phiếu gửi</p>
        <p className={cx(styles.p2)}>(Tra nhiều bill bằng cách thêm dấu phẩy giữa các bill)</p>
        <div className={cx(styles.inputContainer)}>
          <Input className={cx(styles.input)} maxlengt="220" placeHolder={'VD : 12354,45677'} type={'text'}></Input>
        </div>
        <Button className={cx(styles.button)}>Tra cứu</Button>
      </div>
    </div>
  );
};
export default ParcelHeader;
