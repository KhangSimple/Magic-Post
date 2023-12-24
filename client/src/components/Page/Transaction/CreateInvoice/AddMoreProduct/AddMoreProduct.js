import classNames from 'classnames/bind';
import styles from './AddMoreProduct.module.scss';
import Button from '~/components/Button';
import AddIcon from '@mui/icons-material/Add';
const cx = classNames.bind(styles);
const AddMoreProduct = ({ onClick }) => (
  <Button className={cx(styles.button)} onClick={onClick} leftIcon={<AddIcon></AddIcon>}>
    Thêm sản phẩm mới
  </Button>
);
export default AddMoreProduct;
