// NewsPage.js
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './main.module.scss';
import images from '~/assets/images';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const cx = classNames.bind(styles);
const NewsPage = () => {
  return (
    <div className={cx(styles.tinTucSuKien)}>
      <h3 className={cx(styles.newsTitle)}>Tin tức Magic Post</h3>
      <div className={cx(styles.row)}>
        <div className={cx(styles.colLeft)}>
          <div className={cx(styles.blogItem)}>
            <div className={cx(styles.blogImage)}>
              <a href=""></a>
            </div>
            <div className={cx(styles.blogDetail)}>
              <img
                className={cx('image1')}
                src={images.stock}
                alt=" Magic Post khai trương kho trung chuyển hơn 40.000m2 lớn nhất miền Nam"
              />
              <h3 className={cx(styles.blogTitle)}>
                <a
                  href="https://example.com/"
                  title="Magic Post khai trương kho trung chuyển hơn 40.000m2 lớn nhất miền Nam"
                >
                  Magic Post khai trương kho trung chuyển hơn 40.000m2 lớn nhất miền Nam
                </a>
              </h3>
              <div className={cx(styles.blogMeta)}>
                <span className={cx(styles.ngayDang)}>
                  <i className={cx(styles.faCalendar)}></i>{' '}
                  <CalendarMonthIcon sx={{ margin: '0px', fontSize: '16px', color: 'grey' }} /> 24/12/2023
                </span>
              </div>
              <div className={cx(styles.blogShortdesc)}>
                <p>
                  Chỉ sau hơn 6 tháng từ khi bàn giao, kho trung chuyển Xuyên Á đã chính thức đi vào hoạt động tại vị
                  trí chiến lược ngay&nbsp;Khu công nghiệp Xuyên Á, Đức Hòa, tỉnh Long An. Đây là một dấu mốc quan trọng
                  trong công cuộc nâng cao chất lượng...
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={cx(styles.colRight)}>
          <div className={cx(styles.row)}>
            <div className={cx(styles.blogItem)}>
              <div>
                {' '}
                <img className={cx('anhMinhHoa')} src={images.baibao1} alt="ảnh minh họa" />
              </div>
              <div className={cx(styles.blogDetail)}>
                <h3>
                  <a href="https://example.com/" title="Cách tạo nhóm bán hàng trên Facebook và mẹo ra đơn hiệu quả">
                    Cách tạo nhóm bán hàng trên Facebook và mẹo ra đơn hiệu quả
                  </a>
                </h3>
                <div className={cx(styles.date)}>
                  {' '}
                  <i className={cx(styles.faCalendar)}></i>{' '}
                  <CalendarMonthIcon sx={{ margin: '0px', fontSize: '16px', color: 'grey' }} /> 8/1/2023
                </div>
              </div>
            </div>
            <div className={cx(styles.blogItem)}>
              <div class="blog-img">
                {' '}
                <img className={cx('anhMinhHoa')} src={images.baibao2} alt="ảnh minh họa" />
              </div>
              <div className={cx(styles.blogDetail)}>
                <h3>
                  <a href="https://example.com/" title="Cách đổi tên Page Facebook trên điện thoại, máy tính chỉ 60s">
                    Cách đổi tên Page Facebook trên điện thoại, máy tính chỉ 60s
                  </a>
                </h3>
                <span className={cx(styles.date)}>
                  <i className={cx(styles.faCalendar)}></i>{' '}
                  <CalendarMonthIcon sx={{ margin: '0px', fontSize: '16px', color: 'grey' }} /> 2/12/2023
                </span>
              </div>
            </div>
            <div className={cx(styles.blogItem)}>
              <div class="blog-img">
                {' '}
                <img className={cx('anhMinhHoa')} src={images.baibao3} alt="ảnh minh họa" />
              </div>
              <div className={cx(styles.blogDetail)}>
                <h3>
                  <a href="https://example.com/" title="Chi phí biến đổi là gì? Tại sao shop cần lưu ý khi kinh doanh?">
                    Chi phí biến đổi là gì? Tại sao shop cần lưu ý khi kinh doanh?
                  </a>
                </h3>
                <span className={cx(styles.date)}>
                  <i className={cx(styles.faCalendar)}></i>{' '}
                  <CalendarMonthIcon sx={{ margin: '0px', fontSize: '16px', color: 'grey' }} />
                  13/5/2023
                </span>
              </div>
            </div>
            <div className={cx(styles.blogItem)}>
              <div class="blog-img">
                {' '}
                <img className={cx('anhMinhHoa')} src={images.baibao4} alt="ảnh minh họa" />
              </div>
              <div className={cx(styles.blogDetail)}>
                <h3>
                  {' '}
                  <a href="https://example.com/" title="Chi phí ẩn là gì? Các loại chi phí ẩn trong kinh doanh online">
                    Chi phí ẩn là gì? Các loại chi phí ẩn trong kinh doanh online
                  </a>
                </h3>
                <span className={cx(styles.date)}>
                  <i className={cx(styles.faCalendar)}></i>{' '}
                  <CalendarMonthIcon sx={{ margin: '0px', fontSize: '16px', color: 'grey' }} /> 15/7/2023
                </span>
              </div>
            </div>
            <div className={cx(styles.blogItem)}>
              <div class="blog-img">
                {' '}
                <img className={cx('anhMinhHoa')} src={images.baibao5} alt="ảnh minh họa" />
              </div>
              <div className={cx(styles.blogDetail)}>
                <h3>
                  {' '}
                  <a
                    href="https://example.com/"
                    title="Điểm hòa vốn là gì? Vì sao chủ shop cần biết tính điểm hòa vốn?"
                  >
                    Điểm hòa vốn là gì? Vì sao chủ shop cần biết tính điểm hòa vốn?
                  </a>
                </h3>
                <span className={cx(styles.date)}>
                  <i className={cx(styles.faCalendar)}></i>{' '}
                  <CalendarMonthIcon sx={{ margin: '0px', fontSize: '16px', color: 'grey' }} />
                  22/12/2023
                </span>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
