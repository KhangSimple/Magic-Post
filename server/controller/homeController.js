import pool from '../configs/connectDB.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let getTransactionPage = async (req, res) => {
  let a = await pool.execute(
    'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
    [req.params.id],
  );
  let jsonData = a[0];
  return res.json({ data: jsonData });
};

// Đăng nhập vào trang nhân viên
let getEmployeePage = async (req, res) => {
  try {
    let { username, password, kindPoint } = req.body;
    if (kindPoint == 'transaction') {
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
        let [rows, field] = await pool.execute('select * from staff_transaction where username=? and password = ?', [
          username,
          password,
        ]);
        let info = rows[0];
        console.log(info);
        var encryptedPassword = await bcrypt.hash(password, 10);
        info.password = encryptedPassword;
        let [c, _] = await pool.execute('select * from transaction where zip_code = ?', [info.transaction_zip_code]);
        var token = jwt.sign(
          {
            info: { id: info.id, name: info.name, phone: info.phone, email: info.email, img_url: info.img_url },
            role: 'trans-employee',
            trans_info: c[0],
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: '3h',
          },
        );
        return res.status(200).json({ flag: 1, token: token });
      } else {
        return res.json({ flag: 0, checkUsername: checkUsername, checkPassword: checkPassword });
      }
    } else {
      let checkUsername = await pool.execute('select count(username) as ct from staff_collection where username=?', [
        username,
      ]);
      let checkPassword = await pool.execute(
        'select count(username) as ct from staff_collection where username=? and password=?',
        [username, password],
      );
      checkUsername = checkUsername[0][0].ct;
      checkPassword = checkPassword[0][0].ct;
      if ((checkUsername != 0) & (checkPassword != 0)) {
        let [rows, field] = await pool.execute('select * from staff_collection where username=? and password = ?', [
          username,
          password,
        ]);
        let info = rows[0];
        console.log(info);
        var encryptedPassword = await bcrypt.hash(password, 10);
        info.password = encryptedPassword;
        let [c, _] = await pool.execute('select * from collection where zip_code = ?', [info.collection_zip_code]);
        var token = jwt.sign(
          {
            info: { id: info.id, name: info.name, phone: info.phone, email: info.email, img_url: info.img_url },
            role: 'coll-employee',
            coll_info: c[0],
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: '3h',
          },
        );
        return res.status(200).json({ flag: 1, token: token });
      } else {
        return res.json({ flag: 0, checkUsername: checkUsername, checkPassword: checkPassword });
      }
    }
  } catch (err) {}
};

let register = async (req, res) => {
  // console.log(req.body);
  const data = req.body.data;
  // console.log(data);

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
