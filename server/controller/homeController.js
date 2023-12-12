import pool from '../configs/connectDB.js';

let getTransactionPage = async (req, res) => {
  let a = await pool.execute(
    'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
    [req.params.id],
  );
  let jsonData = a[0];
  return res.json({ data: jsonData });
};

let getEmployeePage = async (req, res) => {
  let { username, password } = req.body;
  let checkUsername = await pool.execute('select count(username) as ct from staff_transaction where username=?', [
    username,
  ]);
  let checkPassword = await pool.execute(
    'select count(username) as ct from staff_transaction where username=? and password=?',
    [username, password],
  );
  checkUsername = checkUsername[0][0].ct;
  checkPassword = checkPassword[0][0].ct;
  if ((checkUsername != 0) & (checkPassword != 0)) {
    console.log('Success');
    return res.json({ flag: 1 });
  } else {
    return res.json({ flag: 0, checkUsername: checkUsername, checkPassword: checkPassword });
  }
  // return res.json({ data: jsonData });
};

let register = async (req, res) => {
  // console.log(req.body);
  const data = req.body.data;
  console.log(data);

  await pool.execute('insert into customer(username,password,email,phoneNumber,address) values (?,?,?,?,?)', [
    data.username,
    data.password,
    data.email,
    data.phoneNumber,
    data.address,
  ]);
  console.log('Success');
};

export default {
  getTransactionPage,
  getEmployeePage,
  register,
};
