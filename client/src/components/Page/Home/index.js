import classNames from 'classnames/bind';
import styles from './home.module.scss';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import AppBarMenu from './AppBar';
import Main from './Main';
import Banner from './Banner';
// import { AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Box } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';

const cx = classNames.bind(styles);
// const Banner = ({ images }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const imagesRef = useRef();
//     imagesRef.current = images;
//   }, [images]);

//   const handleChange = () => {
//     setIndex((index + 1) % images.length);
//   };

//   return (
//     <div className="banner">
//       <div className="images">
//         {images.map((image, i) => (
//           <img
//             key={i}
//             src={image.src}
//             alt={image.alt}
//             onClick={handleChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

function HomePage() {
  return (
    <div className={cx('App')}>
      <div class={cx('header')}>
        <Header />
        <AppBarMenu />
      </div>
      <Banner />
      <Main />
    </div>
  );
}
export default HomePage;
