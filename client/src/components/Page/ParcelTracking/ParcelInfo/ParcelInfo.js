import styles from './ParcelInfo.module.scss';
import classNames from 'classnames/bind';
import SubSection from './SubSection/SubSection';
import { ParcelContext } from '..';
import { useContext } from 'react';
import { dateFormat } from '..';
const cx = classNames.bind(styles);
const ParcelInfo = () => {
  const parcel = useContext(ParcelContext).parcelData;
  const data = parcel.data[0] ? parcel.data[0] : {};
  return (
    <div className={cx(styles.wrapper)}>
      <h4 className={cx(styles.header)}>THÔNG TIN VẬN ĐƠN</h4>
      <div className={cx(styles.content)}>
        <div className={cx(styles.section, styles.rightBorder)}>
          <SubSection textLeft={'Mã phiếu gửi:'} textLeftBold={data.id}></SubSection>
          <SubSection textLeft={'Chi tiết đơn hàng:'} textLeftBold={'...'}></SubSection>
          <SubSection textLeft={'Người gửi:'} textLeftBold={data.sender_name}></SubSection>
          <SubSection textLeft={'Người nhận:'} textLeftBold={data.receiver_name}></SubSection>
        </div>
        <div className={cx(styles.section, styles.rightBorder)}>
          <SubSection textLeft={'Khối lượng(Gram):'} textLeftBold={data.weight}></SubSection>
          <SubSection textLeft={'Dịch vụ:'} textLeftBold={'Nội tỉnh tiết kiệm'}></SubSection>
          <SubSection
            textLeft={'Trạng thái:'}
            textLeftBold={data.curpos === 4 ? 'Giao hàng thành công' : 'Đang giao hàng'}
          ></SubSection>
        </div>
        <div className={cx(styles.section)}>
          <SubSection textLeft={'Ngày tạo:'} textLeftBold={dateFormat(data.createdTime)}></SubSection>
          <SubSection textLeft={'Ngày nhận hàng:'} textLeftBold={dateFormat(data.receivedTime)}></SubSection>
          <SubSection textLeft={'Ngày nhận hàng dự kiến:'} textLeftBold={''}></SubSection>
        </div>
      </div>
    </div>
  );
};
export default ParcelInfo;
