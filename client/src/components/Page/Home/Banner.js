import classNames from 'classnames/bind';
import styles from './home.module.scss';
import images from '~/assets/images';
import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  const cx = classNames.bind(styles);
  return (
    <div className={cx(styles.bannerContainer)}>
      <Slider {...settings}>
        <div>
          <img className={cx(styles.banner)} src={images.banner1} alt="banner1" style={imageStyle} />
          <div className={cx(styles.lineBanner)}></div>
        </div>
        <div>
          <img className={cx(styles.banner)} src={images.banner2} alt="banner2" style={imageStyle} />
          <div className={cx(styles.lineBanner)}></div>
        </div>
        <div>
          <img className={cx(styles.banner)} src={images.banner3} alt="banner3" style={imageStyle} />
          <div className={cx(styles.lineBanner)}></div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
