import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

// export const users = [...Array(24)].map((_, index) => ({
//   id: faker.string.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.person.fullName(),
//   email: 'duykhanhxx03@magicpost.com',
//   phoneNumber: '0123456789',
//   status: sample(['Hoạt động', 'Khoá']),
//   role: sample(['Nhân viên', 'Admin']),
// }));

export const users = [];
axios
  .get(`http://localhost:1510/getTransactionStaffList`, {
    params: {
      zip_code: localStorage.getItem('zip_code'),
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
