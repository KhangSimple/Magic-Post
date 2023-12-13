import pool from '../configs/connectDB.js';

// Tạo tài khoản cho nhân viên tại điểm giao dịch
// Đầu vào chứa các thông tin của nhân viên: Username, password, phone, email, transaction_zip_code
let createStaffTransAccount = async (req, res) => {
  let data = req.body.data;
  await pool.execute(
    'insert into staff_transaction(username,password,phone,email,transaction_zip_code) values(?,?,?,?,?)',
    [data.username, data.password, data.phone, data.email, data.transaction_zip_code],
  );
};

// Tạo tài khoản cho nhân viên tại điểm tập kết
// Đầu vào chứa các thông tin của nhân viên: Username, password, phone, email, collection_zip_code
let createStaffCollAccount = async (req, res) => {
  let data = req.body.data;
  await pool.execute(
    'insert into staff_collection(username,password,phone,email,collection_zip_code) values(?,?,?,?,?)',
    [data.username, data.password, data.phone, data.email, data.collection_zip_code],
  );
};

// Xóa tài khoản của nhân viên tại điểm giao dịch
// Dữ liệu đầu vào là ID của nhân viên
let deleteStaffTransAccount = async (req, res) => {
  let data = req.body.data;
  await pool.execute('delete from staff_transaction where id = ?', [data.id]);
  console.log('Success');
};

// Xóa tài khoản của nhân viên tại điểm tập kết
// Dữ liệu đầu vào là ID của nhân viên
let deleteStaffCollAccount = async (req, res) => {
  let data = req.body.data;
  await pool.execute('delete from staff_collection where id = ?', [data.id]);
  console.log('Success');
};

// Lấy dang sách hàng đến và đi của transaction
// Dữ liệu đầu vào là transaction id
let getTransactionList = async (req, res) => {
  let { id } = req.query;
  let [rows, field] = await pool.execute(
    'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
    [id],
  );
  return res.json(rows);
};

// Lấy dang sách hàng đến và đi của collection
// Dữ liệu đầu vào là collection id
let getCollectionList = async (req, res) => {
  let { id } = req.query;
  let [rows, field] = await pool.execute(
    'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
    [id],
  );
  return res.json(rows);
};

// Tạo đơn hàng
// Đầu vào là các thông tin cần thiết để tạo đợi hàng
let createParcel = async (req, res) => {
  let data = req.body.data;
  let keys = Object.keys(data);
  let column_list = keys.join(',');
  const mark = '?,'.repeat(keys.length - 1) + '?';
  const values = keys.map((key) => data[key]);
  console.log(values[0]);
  await pool.execute(
    `insert into parcels(${column_list}) values(` + `${mark}` + `)`,
    values,
    // keys.map((key) => data[key]),
  );
  console.log('Success');
};
export default {
  createStaffTransAccount,
  createStaffCollAccount,
  deleteStaffTransAccount,
  deleteStaffCollAccount,
  getTransactionList,
  getCollectionList,
  createParcel,
};
