// ----------------------------------------------------------------------

let info = JSON.parse(localStorage.getItem('employee_info'));

// export const account = {
//   displayName: 'Jaydon Frankie',
//   email: 'demo@minimals.cc',
//   photoURL: '/assets/images/avatars/avatar_25.jpg',
// };
if (info === null) {
  info = {
    name: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    img_url: '/assets/images/avatars/avatar_25.jpg',
  };
}
export const account = {
  displayName: info.name || '',
  email: info.email || '',
  photoURL: info.img_url || '',
};
