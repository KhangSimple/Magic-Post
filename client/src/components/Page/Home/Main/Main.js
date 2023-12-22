import classNames from 'classnames/bind';
import styles from './main.module.scss';
import React, { useState } from 'react';
import images from '~/assets/images';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const cx = classNames.bind(styles);

const Main = () => {
  const [activeTab, setActiveTab] = useState('tra-cuu');

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.serviceContainer)}>
        <ul className={cx(styles.u1)}>
          <li
            className={cx(styles.traCuu, { active: activeTab === 'tra-cuu' })}
            onClick={() => setActiveTab('tra-cuu')}
          >
            Tra cứu
          </li>
          <li
            className={cx(styles.dichVu, { active: activeTab === 'dich-vu' })}
            onClick={() => setActiveTab('dich-vu')}
          >
            Dịch vụ
          </li>
        </ul>

        <ul className={cx(styles.box)}>
          {activeTab === 'tra-cuu' && (
            <ul className={cx(styles.menuItems)}>
              <li className={cx(styles.subMenuItem)} onClick={() => console.log('Tra cứu vận đơn')}>
                Tra cứu vận đơn
              </li>
              <li className={cx(styles.subMenuItem)} onClick={() => console.log('Ước tính cước phí')}>
                Ước tính cước phí
              </li>
              <li className={cx(styles.subMenuItem)} onClick={() => console.log('Tìm kiếm bưu cục')}>
                Tìm kiếm bưu cục
              </li>
              <li className={cx(styles.subMenuItem)} onClick={() => console.log('Đăng ký đại lý thu gom')}>
                Đăng ký đại lý thu gom
              </li>
            </ul>
          )}
          {activeTab === 'dich-vu' && (
            <div>
              Cuộc sống của chúng ta là chuỗi những khoảnh khắc, có thể không hoàn hảo nhưng thật đáng nhớ. Năm 1999, ca
              sĩ Trần Thăng đã bán vé concert của mình trước hẳn một năm và chỉ dành cho các cặp đôi, một người mua có
              thể nhận được hai chỗ ngồi. Tuy nhiên, loại vé tình nhân này được chia thành phiếu nam và phiếu nữ. Cả hai
              bên đều giữ phiếu của riêng mình. Sau một năm, hai phiếu đó kết hợp mới có hiệu lực. Tên của đại nhạc hội
              này là "Năm sau anh còn yêu em không?" một câu hỏi tưởng chừng đơn giản nhưng lại vô cùng sắc bén. Một năm
              sau, nhạc hội bắt đầu, ghế mà Trần Thăng dành cho các cặp tình nhân quả nhiên còn trống rất nhiều. Đối
              diện với từng hàng ghế trống, khuôn mặt anh ấy hiện rõ vẻ áy náy lạ kỳ, bài cuối cùng anh hát là "Để lại
              nỗi đau cho chính mình". Đời người giống như khiêu vũ vậy, người dạy bạn từng bước nhảy chưa chắc đã đi
              cùng bạn đến khi tàn cuộc. Có lẽ một số mối tình đã được định sẵn là không thể thiên trường địa cửu nhưng
              vẫn muốn giữ mãi trong tim, cất trong lòng mối tình không thể nói ra. Trích "Hãy khiến tương lai biết ơn
              vì hiện tại bạn đã cố gắng hết mình" của Bạch Tô. Cuộc sống của chúng ta là chuỗi những khoảnh khắc, có
              thể không hoàn hảo nhưng thật đáng nhớ. Hãy để người bạn đồng hành là Nescafe Sữa đá tiếp thêm năng lượng
              giúp bạn tập trung, tỉnh táo, tận hưởng trọn khoảnh khắc trên hành trình khám phá cuộc sống này.Cuộc sống
              của chúng ta là chuỗi những khoảnh khắc, có thể không hoàn hảo nhưng thật đáng nhớ. Hãy để người bạn đồng
              hành là Nescafe Sữa đá tiếp thêm năng lượng giúp bạn tập trung, tỉnh táo, tận hưởng trọn khoảnh khắc trên
              hành trình khám phá cuộc sống này.Cuộc sống của chúng ta là chuỗi những khoảnh khắc, có thể không hoàn hảo
              nhưng thật đáng nhớ. Hãy để người bạn đồng hành là Nescafe Sữa đá tiếp thêm năng lượng giúp bạn tập trung,
              tỉnh táo, tận hưởng trọn khoảnh khắc trên hành trình khám phá cuộc sống này.Cuộc sống của chúng ta là
              chuỗi những khoảnh khắc, có thể không hoàn hảo nhưng thật đáng nhớ. Hãy để người bạn đồng hành là Nescafe
              Sữa đá tiếp thêm năng lượng giúp bạn tập trung, tỉnh táo, tận hưởng trọn khoảnh khắc trên hành trình khám
              phá cuộc sống này.Cuộc sống của chúng ta là chuỗi những khoảnh khắc, có thể không hoàn hảo nhưng thật đáng
              nhớ. Hãy để người bạn đồng hành là Nescafe Sữa đá tiếp thêm năng lượng giúp bạn tập trung, tỉnh táo, tận
              hưởng trọn khoảnh khắc trên hành trình khám phá cuộc sống này.
            </div>
          )}
        </ul>
      </div>

      <div className={cx(styles.tinTucSuKien)}>
        <h3 class="tit-tt">Tin tức Magic Post</h3>
      </div>

      <div className={cx(styles.quangCao)}>
        <div className={cx(styles.s1)}>
          <h4>
            Mạng lưới bưu cục <br />
            trên 63 tỉnh thành{' '}
          </h4>
          <div>
            <a href="">
              <img className={cx('logo')} src={images.appstore} alt="logo" />
            </a>
            <a href="">
              <img className={cx('logo')} src={images.ggstore} alt="logo" />
            </a>
          </div>
        </div>
        <div className={cx(styles.s2)}>
          <div className={cx(styles.cout)}>
            <div>
              <GroupsIcon sx={{ margin: '10px', fontSize: '80px', color: 'white' }} />
            </div>
            <div>
              <h5>
                <div>300.000 +</div>
              </h5>
              <p>KHÁCH HÀNG TIN DÙNG</p>
            </div>
          </div>

          <div className={cx(styles.cout)}>
            <div>
              <LocalShippingIcon sx={{ margin: '10px', fontSize: '80px', color: 'white' }} />
            </div>
            <div>
              <h5>
                <div>100.000 +</div>
              </h5>
              <p>ĐƠN HÀNG ĐANG VẬN CHUYỂN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
