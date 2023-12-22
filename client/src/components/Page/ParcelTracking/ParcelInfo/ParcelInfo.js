import styles from './ParcelInfo.module.scss';
import classNames from 'classnames/bind';
import SubSection from './SubSection/SubSection';
const cx = classNames.bind(styles);
const ParcelInfo = () => {
  return (
    <div className={cx(styles.wrapper)}>
      <h4 className={cx(styles.header)}>THÔNG TIN VẬN ĐƠN</h4>
      <div className={cx(styles.content)}>
        <div className={cx(styles.section, styles.rightBorder)}>
          <SubSection textLeft={'Mã phiếu gửi:'} textLeftBold={'12345'}></SubSection>
          <SubSection textLeft={'Chi tiết đơn hàng:'} textLeftBold={'Mã phiếu gửi:'}></SubSection>
          <SubSection textLeft={'Người gửi:'} textLeftBold={' - T.Hà Tĩnh - TX.Kỳ Anh '}></SubSection>
          <SubSection textLeft={'Người nhận:'} textLeftBold={'- Hà Tĩnh - THỊ XÃ KỲ ANH'}></SubSection>
        </div>
        <div className={cx(styles.section, styles.rightBorder)}>
          <SubSection textLeft={'Khối lượng(Gram):'} textLeftBold={'1000'}></SubSection>
          <SubSection textLeft={'Dịch vụ:'} textLeftBold={'Nội tỉnh tiết kiệm'}></SubSection>
          <SubSection textLeft={'Trạng thái:'} textLeftBold={'Đang giao hàng'}></SubSection>
        </div>
        <div className={cx(styles.section)}>
          <SubSection textLeft={'Ngày tạo:'} textLeftBold={'null'}></SubSection>
          <SubSection textLeft={'Ngày nhận hàng:'} textLeftBold={'29/12/2023'}></SubSection>
          <SubSection textLeft={'Ngày nhận hàng dự kiến:'} textLeftBold={''}></SubSection>
        </div>
      </div>
    </div>
  );
};
export default ParcelInfo;
