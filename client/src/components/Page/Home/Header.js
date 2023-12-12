import classNames from 'classnames/bind';
import styles from './home.module.scss';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        <img className={cx('logo')} src={images.logo} alt="logo" />
      </div>
      <div className={cx('search-login')}>
        <div className={cx('search')}>
          <div className={cx('search-icon')}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            className={cx('search-input')}
            placeHolder="Tìm kiếm"
            onChange={(value) => {
              console.log('Hehe');
            }}
          />
        </div>
        <div className={cx('login-register')}>
          <button onClick={handleLoginRegisterClick}>Đăng ký/Đăng nhập</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
