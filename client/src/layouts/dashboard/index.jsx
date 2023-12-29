import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import EditUserProfile from '~/layouts/dashboard/EditUserProfile/EditUserProfile';
const cx = classNames.bind(styles);

// ----------------------------------------------------------------------


export default function DashboardLayout({ children, navConfig }) {
  const [openNav, setOpenNav] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [currentUserEditProfile, setCurrentUserEditProfile] = useState();

  const handleCloseEditUserProfileModal = () => {
    setEditUserModalOpen(false);
  };

  const handleOpenEditUserProfileModal = () => {
    setEditUserModalOpen(true);
  };

  return (
    <>
      <Header handleOpenEditUserProfileModal={handleOpenEditUserProfileModal} onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} navConfig={navConfig} />

        <Main>{children}</Main>
      </Box>

      <Dialog className={cx(styles.dialog)} open={editUserModalOpen} onClose={handleCloseEditUserProfileModal} fullWidth maxWidth="lg">
        <DialogTitle className={cx(styles.title)}>Cập nhật thông tin tài khoản cá nhân</DialogTitle>
        <DialogContent>
          <EditUserProfile idUser={currentUserEditProfile} handleCloseModal={handleCloseEditUserProfileModal}></EditUserProfile>
        </DialogContent>
      </Dialog>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
