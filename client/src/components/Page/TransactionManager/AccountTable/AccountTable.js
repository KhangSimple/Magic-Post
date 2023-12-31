import { useState, Fragment } from 'react';
import { sample } from 'lodash';

import DashboardLayout from 'src/layouts/dashboard';
import navConfig from '../config-navigation';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CreateUser from '~/components/Page/TransactionManager/CreateUser/CreateUser';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';

// import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';

import TableNoData from './table-no-data';
import UserTableRow from './user-table-row';
import UserTableHead from './user-table-head';
import TableEmptyRows from './table-empty-rows';
import UserTableToolbar from './user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import styles from './AccountTable.module.scss';
import * as React from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUserProfile from '~/components/Page/TransactionManager/EditUserProfile/EditUserProfile';
import editUserProfile from '~/components/Page/TransactionManager/EditUserProfile/EditUserProfile';

const cx = classNames.bind(styles);
// ----------------------------------------------------------------------

export default function AccountManagementTable() {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [currentUserEditProfile, setCurrentUserEditProfile] = useState();

  React.useEffect(() => {
    axios
      .get(`http://localhost:1510/getTransactionStaffList`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        setUsers(
          response.data.map((row) => {
            return {
              id: row.id,
              avatarUrl: row.img_url,
              name: row.name,
              username: row.username,
              password: row.password,
              address: row.address,
              email: row.email,
              phoneNumber: row.phone,
              status: sample(['Hoạt động']),
              role: sample(['Nhân viên']),
            };
          }),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCreateAccount = () => {
    handleCloseCreateUserModal();
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleCloseCreateUserModal = () => {
    setCreateUserModalOpen(false);
  };

  const handleCloseEditUserProfileModal = () => {
    setEditUserModalOpen(false);
  };

  return (
    <DashboardLayout navConfig={navConfig}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">ĐIỂM GIAO DỊCH {localStorage.getItem('name').toUpperCase() || ''}</Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setCreateUserModalOpen(true)}
          >
            Tạo tài khoản
          </Button>
        </Stack>

        <Card>
          <UserTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <TableContainer sx={{ overflow: 'set' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Tên' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Chức vụ' },
                  { id: 'phoneNumber', label: 'Số điện thoại', align: 'center' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      email={row.email}
                      avatarUrl={row.avatarUrl}
                      phoneNumber={row.phoneNumber}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleEditProfile={() => {
                        setEditUserModalOpen(true);
                        setCurrentUserEditProfile(row);
                      }}
                    />
                  );
                })}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, users.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Dialog
          className={cx(styles.dialog)}
          open={createUserModalOpen}
          onClose={handleCloseCreateUserModal}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle className={cx(styles.title)}>Tạo tài khoản cho nhân viên</DialogTitle>
          <DialogContent>
            <CreateUser handleCreateAccount={handleCreateAccount}></CreateUser>
          </DialogContent>
        </Dialog>
        <Dialog
          className={cx(styles.dialog)}
          open={editUserModalOpen}
          onClose={handleCloseEditUserProfileModal}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle className={cx(styles.title)}>Cập nhật thông tin tài khoản nhân viên</DialogTitle>
          <DialogContent>
            <EditUserProfile
              idUser={currentUserEditProfile}
              handleCloseModal={handleCloseEditUserProfileModal}
            ></EditUserProfile>
          </DialogContent>
        </Dialog>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </DashboardLayout>
  );
}
