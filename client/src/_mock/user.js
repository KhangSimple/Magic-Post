import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  email: 'duykhanhxx03@magicpost.com',
  phoneNumber: '0123456789',
  status: sample(['Hoạt động', 'Khoá']),
  role: sample(['Nhân viên', 'Admin']),
}));
