import classNames from 'classnames/bind';
import styles from './home.module.scss';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
const cx = classNames.bind(styles);
//header
const Header = () => {
  const navigate = useNavigate();
  const handleLoginRegisterClick = () => {
    navigate('/user/login');
  };
  return (
    <header>
      <div>
        <img className={cx(styles.logo)} src={images.logo} alt="logo" />
      </div>
      <div className={cx(styles.searchLogin)}>
        <div className={cx(styles.search)}>
          <SearchIcon fontSize="small" color="primary" sx={{ m: 1 }} />
          <input
            className={cx('search-input')}
            placeholder="Tìm kiếm"
            onChange={(value) => {
            }}
          />
        </div>
        <div className={cx(styles.loginRegister)}>
          <button onClick={handleLoginRegisterClick}>
            <LoginIcon fontSize="small" sx={{ m: 1 }} />
            Đăng ký / Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
