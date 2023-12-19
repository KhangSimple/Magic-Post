import classNames from 'classnames/bind';
import styles from './home.module.scss';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header';
import AppBarMenu from './AppBar';
import Banner from './Banner';
import Main from './Main/Main';
import Footer from './Footer/Footer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Input from '~/components/Input';
// import { AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Box } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx(styles.App)}>
      <div class={cx(styles.header)}>
        <Header />
        <AppBarMenu />
      </div>
      <Banner />
      <div class={cx(styles.main)}>
        <Main />
      </div>
      <div class={cx(styles.footer)}>
        <Footer />
      </div>
    </div>
  );
}
export default HomePage;
