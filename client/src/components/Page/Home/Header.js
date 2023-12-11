import classNames from 'classnames/bind';
import styles from './home.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
//header
const Header = () => {
  return (
    <header>
      <div>
        <img className={cx('logo')} src={images.logo} alt="logo" />
      </div>
      <div className={cx('search-login')}>
        <div className={cx('search')}>
          <input
            className={cx('search-input')}
            // leftIcon={<FontAwesomeIcon icon={faSearch} />}
            placeHolder="Tìm kiếm"
            onChange={(value) => {
              console.log('Hehe');
            }}
          />
        </div>
        <div className={cx('login-register')}>
          <button>Đăng ký/Đăng nhập</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
