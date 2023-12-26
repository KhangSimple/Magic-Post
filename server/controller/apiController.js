import pool from '../configs/connectDB.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { log } from 'console';
import Parcel from '../Object/Parcel/index.js';

dotenv.config();

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Tạo tài khoản cho nhân viên tại điểm giao dịch
// Đầu vào chứa các thông tin của nhân viên: Username, password, phone, email, transaction_zip_code
let createStaffTransAccount = async (req, res) => {
  try {
    let data = req.body.data;
    let keys = Object.keys(data);
    let column_list = keys.join(',');
    const mark = '?,'.repeat(keys.length - 1) + '?';
    const values = keys.map((key) => data[key]);
    var encryptedPassword = await bcrypt.hash(data.password, 10);
    data.password = encryptedPassword;
    // await pool.execute(`insert into staff_transaction(${column_list}) values(` + `${mark}` + `)`, values);
    var token = jwt.sign({ foo: 'bar' }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    console.log(token);
    res.status(200).json({ data: { token: token } });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ Error: 'Lỗi' });
  }
};

// Tạo tài khoản cho nhân viên tại điểm tập kết
// Đầu vào chứa các thông tin của nhân viên: Username, password, phone, email, collection_zip_code
let createStaffCollAccount = async (req, res) => {
  let data = req.body.data;
  let keys = Object.keys(data);
  let column_list = keys.join(',');
  const mark = '?,'.repeat(keys.length - 1) + '?';
  const values = keys.map((key) => data[key]);
  await pool.execute(`insert into staff_collection(${column_list}) values(` + `${mark}` + `)`, values);
  console.log('Success');
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
  try {
    let { id, type, status } = req.query || req.body || req.params || '';
    let [rows, field] = await pool.execute(
      'SELECT *,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ? and ts.type = ? and ts.status = ?',
      [id, type, status],
    );
    return res.json(rows);
  } catch (err) {
    console.log('Vllll');
  }
};

// Lấy dang sách hàng đến và đi của collection
// Dữ liệu đầu vào là collection id
let getCollectionList = async (req, res) => {
  try {
    let { id, type, status } = req.query || req.body || req.params || '';
    let [rows, field] = await pool.execute(
      'SELECT *,ts.sender_col_zip_code,ts.status,ts.type from parcels join collection_stock as ts on parcels.id = ts.parcel_id where ts.collection_zip_code = ? and ts.type = ? and ts.status = ?',
      [id, type, status],
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.log('Vllll');
  }
};

let createParcel = async (req, res) => {
  try {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    let data = req.body.data;
    let parcel = new Parcel();
    parcel.setParcel(
      generateString(5),
      dateTime,
      data.zip_code,
      data.senderInfo,
      data.receiverInfo,
      data.productList,
      data.packageProductInfo,
      data.note,
    );
    let keys = Object.keys(parcel);
    let column_list = keys.join(',');
    const mark = '?,'.repeat(keys.length - 1) + '?';
    const values = keys.map((key) => parcel[key]);
    await pool.execute(`insert into parcels(${column_list}) values(` + `${mark}` + `)`, values);
    await pool.execute(
      `insert into transaction_stock(transaction_zip_code,parcel_id, sender_col_zip_code, status, type, is_confirm) values(?,?,?,?,?,?)`,
      [parcel.sender_zip_code, parcel.id, null, 'Chờ gửi', 'in', 1],
    );
    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.log(err);
  }
};

/*
Gửi đơn hàng
Input
parcel_id: 'new',
sender_zip_code: '12345',
cur_pos: 0,
kind_point: 'transaction',
trans_id: '12345',*/
let sendParcel = async (req, res) => {
  //
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;

  let data = req.body.data;
  let { kind_point, parcel_id, package_id } = data;
  let [c, field] = await pool.execute('select cur_pos from parcels where id = ?', [parcel_id]);
  let cur_pos = c[0].cur_pos;
  console.log(cur_pos);
  if (kind_point == 'transaction') {
    if (cur_pos == 0) {
      let [trans_id_, _] = await pool.execute('select sender_zip_code from parcels where id = ?', [parcel_id]);
      let trans_id = trans_id_[0].sender_zip_code;
      await pool.execute(
        'update transaction_stock set status = "Đang gửi",type = "out",send_time = ?,parcel_package_id = ?  where parcel_id = ?',
        [dateTime, package_id, parcel_id],
      );
      let col_id = await pool.execute('SELECT collection_zip_code from transaction where zip_code = ?', [trans_id]);
      await pool.execute(
        "insert into collection_stock (collection_zip_code,parcel_package_id,parcel_id,sender_transaction_zip_code,status,type,is_confirm) values(?,?,?,?,'Chờ xác nhận','in',0)",
        [col_id[0][0].collection_zip_code, package_id, parcel_id, trans_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);
      console.log('Send Parcel Success');
    }
  } else {
    if (cur_pos == 1) {
      let [sender, _] = await pool.execute(
        'select collection_zip_code from transaction where zip_code = (select sender_zip_code from parcels where id = ?)',
        [parcel_id],
      );
      let coll_id = sender[0].collection_zip_code;
      let [row, field] = await pool.execute(
        'select collection_zip_code from transaction where zip_code = (select receiver_zip_code from parcels where id = ?)',
        [parcel_id],
      );
      await pool.execute(
        'update collection_stock set status = "Đang gửi",type = "out",parcel_package_id = ? ,send_time = ? where parcel_id = ?',
        [package_id, dateTime, parcel_id],
      );
      await pool.execute(
        "insert into collection_stock (collection_zip_code,parcel_package_id,parcel_id,sender_col_zip_code,status,type,is_confirm) values(?,?,?, ?,'Chờ gửi','in',0)",
        [row[0].collection_zip_code, package_id, parcel_id, coll_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);
      return res.status(200);
    }
    if (cur_pos == 2) {
      let [receiver, _] = await pool.execute(
        'select collection_zip_code from transaction where zip_code = (select receiver_zip_code from parcels where id = ?)',
        [parcel_id],
      );
      let coll_id = receiver[0].collection_zip_code;
      let [row, field] = await pool.execute('select receiver_zip_code from parcels where id = ?', [parcel_id]);
      await pool.execute(
        'update collection_stock set status = "Đang gửi",type = "out",,parcel_package_id = ? ,send_time = ? where parcel_id = ? and collection_zip_code = ?',
        [package_id, dateTime, parcel_id, coll_id],
      );
      await pool.execute(
        "insert into transaction_stock (transaction_zip_code,parcel_package_id,parcel_id,sender_col_zip_code,status,type,is_confirm) values(?,?,?,?,'Chờ gửi','in',0)",
        [row[0].receiver_zip_code, package_id, parcel_id, coll_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);
      return res.status(200);
    }
  }
};

/*Xác nhận đơn hàng
parcel_id: 'new',
sender_zip_code: '12345',
sender_col_zip_code: '',
cur_pos: 1,
coll_id: 'abc',
kind_point: 'collection',
trans_id: '12345'*/
let confirmParcel = async (req, res) => {
  try {
    console.log('Confirm parcel');
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    let data = req.body.data;
    let kind_point = data.kind_point;
    let parcel_id = data.parcel_id;
    let [c, field] = await pool.execute('select cur_pos from parcels where id = ?', [parcel_id]);
    let cur_pos = c[0].cur_pos;
    console.log('Cur-pos: ', cur_pos);
    if (kind_point == 'transaction') {
      if (cur_pos == 3) {
        let [receiver_, __] = await pool.execute(
          'select collection_zip_code from transaction where zip_code = (select receiver_zip_code from parcels where id = ?);',
          [parcel_id],
        );
        let sender = receiver_[0].collection_zip_code;
        let [trans_id_, _] = await pool.execute('select receiver_zip_code from parcels where id = ?', [parcel_id]);
        let trans_id = trans_id_[0].receiver_zip_code;
        await pool.execute(
          "update collection_stock set status = 'Đã gửi thành công',is_confirm = 1 where parcel_id = ? and collection_zip_code = ?",
          [parcel_id, sender],
        );
        await pool.execute(
          "update transaction_stock set status = 'Chờ gửi',type='in',receive_time = ? where parcel_id = ? and transaction_zip_code = ?",
          [dateTime, parcel_id, trans_id],
        );
        return res.status(200);
      }
      return res.send('Fail');
    } else {
      if (cur_pos == 1) {
        let [sender_, _] = await pool.execute('select sender_zip_code from parcels where id = ?', [parcel_id]);
        let sender = sender_[0].sender_zip_code;
        await pool.execute(
          "update transaction_stock set status = 'Đã gửi thành công',is_confirm = 1 where parcel_id = ? and transaction_zip_code = ?",
          [parcel_id, sender],
        );
        await pool.execute(
          'update collection_stock set is_confirm = 1,status="Chờ gửi",receive_time = ? where parcel_id = ? and sender_transaction_zip_code = ?',
          [dateTime, parcel_id, sender],
        );
      }
      if (cur_pos == 2) {
        let [sender_, _] = await pool.execute(
          'select collection_zip_code from transaction where zip_code = (select sender_zip_code from parcels where id = ?);',
          [parcel_id],
        );
        let sender = sender_[0].collection_zip_code;
        let [receiver_, __] = await pool.execute(
          'select collection_zip_code from transaction where zip_code = (select receiver_zip_code from parcels where id = ?);',
          [parcel_id],
        );
        let coll_id = receiver_[0].collection_zip_code;
        await pool.execute(
          "update collection_stock set status = 'Đã gửi thành công',is_confirm = 1 where parcel_id = ? and collection_zip_code = ?",
          [parcel_id, sender],
        );
        await pool.execute(
          'update collection_stock set is_confirm = 1,status="Chờ gửi",receive_time = ? where parcel_id = ? and collection_zip_code = ?',
          [dateTime, parcel_id, coll_id],
        );
      }
    }
  } catch (err) {}
  return res.send('Fail');
};

let searchParcel = async (req, res) => {
  try {
    let { parcel_id } = req.query;
    let [parcel_info, field] = await pool.execute('select * from parcels where id = ?', [parcel_id]);
    if (!parcel_info.length) {
      return res.status(200).json({ data: {}, info: [] });
    }
    let [trans_info, _] = await pool.execute('select * from transaction_stock where parcel_id = ?', [parcel_id]);
    let [coll_info, __] = await pool.execute('select * from collection_stock where parcel_id = ?', [parcel_id]);
    let cur_pos = parcel_info[0].cur_pos;
    let f_trans_address = await pool.execute('select address from transaction where zip_code = ?', [
      parcel_info[0].sender_zip_code,
    ]);
    let f_colls_address = await pool.execute(
      'select c.address from collection as c join transaction as t on c.zip_code = t.collection_zip_code where t.zip_code = ?',
      [parcel_info[0].sender_zip_code],
    );
    let l_colls_address = await pool.execute(
      'select c.address from collection as c join transaction as t on c.zip_code = t.collection_zip_code where t.zip_code = ?',
      [parcel_info[0].receiver_zip_code],
    );
    let l_trans_address = await pool.execute('select address from transaction where zip_code = ?', [
      parcel_info[0].receiver_zip_code,
    ]);
    let info = [];
    if (cur_pos == 0) {
      if (trans_info[0].type == 'in') {
        info.push({ status: 'Đang xử lí', time: trans_info.receive_time, address: f_trans_address[0][0].address });
      }
    }
    if (cur_pos > 0) {
      info.push({ status: 'Đã rời', time: trans_info[0].send_time, address: f_trans_address[0][0].address });
      if (coll_info[0].is_confirm == 1) {
        info.push({ status: 'Nhận tại', time: coll_info[0].receive_time, address: f_colls_address[0][0].address });
      }
    }
    if (cur_pos > 1) {
      info.push({ status: 'Đã rời', time: coll_info[0].send_time, address: f_colls_address[0][0].address });
      if (coll_info[1].is_confirm == 1) {
        info.push({ status: 'Nhận tại', time: coll_info[1].receive_time, address: l_colls_address[0][0].address });
      }
    }
    if (cur_pos > 2) {
      info.push({ status: 'Đã rời', time: coll_info[1].send_time, address: l_colls_address[0][0].address });
      console.log(trans_info);
      if (trans_info[1].is_confirm == 1) {
        info.push({ status: 'Nhận tại', time: trans_info[1].receive_time, address: l_trans_address[0][0].address });
      }
    }
    return res.json({ data: parcel_info, info: info });
  } catch (err) {
    console.log(err);
  }
};

let addTransaction = (req, res) => {
  const data = req.body.data;
  data.map((item) => {
    pool.execute('insert into transaction values(?,?,?,?,?)', [
      item.DistrictID,
      item.DistrictName,
      item.ProvinceID,
      +item.Code,
      item.DistrictName,
    ]);
  });
};

let addCollection = (req, res) => {
  const data = req.body.data;
  data.map((item) => {
    pool.execute('insert into collection values(?,?,?,?)', [
      item.ProvinceID,
      item.ProvinceName,
      +item.Code,
      item.NameExtension[1],
    ]);
  });
};
let getArrivalParcelPackage = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id || '';
    const [rows, field] = await pool.execute(
      'select * from parcel_package where status = "Chờ xác nhận" and receiver_id = ? and package_kind = "in" ',
      [id],
    );
    console.log(rows);
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
  }
};
let getSendedParcelPackage = async (req, res) => {
  try {
    const id = req.body.id || req.query.id || req.params.id || '';
    const [rows, field] = await pool.execute(
      'select * from parcel_package where sender_id = ? and package_kind = "in" ',
      [id],
    );
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
  }
};

let getPackageDetail = async (req, res) => {
  try {
    const package_id = req.body.package_id || req.query.package_id || '';
    let [rows, field] = await pool.execute(
      'select * from parcels as p join transaction_stock as ts on p.id = ts.parcel_id where ts.parcel_package_id = ?',
      [package_id],
    );
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
  }
};

let getCollectionPackageDetail = async (req, res) => {
  try {
    const { package_id, collection_id } = req.query || req.body || {};
    let [rows, field] = await pool.execute(
      'select * from parcels as p join collection_stock as cs on p.id = cs.parcel_id where cs.parcel_package_id = ? and cs.collection_zip_code = ?',
      [package_id, collection_id],
    );
    console.log(rows);
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
  }
};
let getTransactionPackageDetail = async (req, res) => {
  try {
    const { package_id, transaction_id } = req.query || req.body || {};
    let [rows, field] = await pool.execute(
      'select * from parcels as p join transaction_stock as cs on p.id = cs.parcel_id where cs.parcel_package_id = ? and cs.transaction_zip_code = ?',
      [package_id, transaction_id],
    );
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
  }
};

let sendPackage = async (req, res) => {
  return res.status(200);
};
let confirmCollecionPackage = async (req, res) => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;

  try {
    let { package_id, zip_code } = req.body.data;
    await pool.execute(
      'update parcel_package set status = "Đã xác nhận",receive_date = ? where parcel_package_id = ?',
      [dateTime, package_id],
    );
    let [parcel_ids, field] = await pool.execute(
      'select parcel_id from collection_stock where parcel_package_id = ? and collection_zip_code = ?',
      [package_id, zip_code],
    );
    return res.status(200).json({ parcel_ids: parcel_ids });
  } catch (err) {
    console.log(err);
  }
};
let confirmTransactionPackage = async (req, res) => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;

  try {
    let { package_id, zip_code } = req.body.data;
    await pool.execute(
      'update parcel_package set status = "Đã xác nhận",receive_date = ? where parcel_package_id = ?',
      [dateTime, package_id],
    );
    let [parcel_ids, field] = await pool.execute(
      'select parcel_id from transaction_stock where parcel_package_id = ? and transaction_zip_code = ?',
      [package_id, zip_code],
    );
    return res.status(200).json({ parcel_ids: parcel_ids });
  } catch (err) {
    console.log(err);
  }
};

let createCollectionPackage = async (req, res) => {
  try {
    let { parcel_id, sender_id, sender_name, receiver_id, type } = req.body.data;
    let package_id = generateString(6);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    let [c, _] = await pool.execute('select cur_pos from parcels where id = ?', [parcel_id[0]]);
    let cur_pos = c[0].cur_pos;
    if (cur_pos == 1) {
      let [nextPoint_, __] = await pool.execute(
        'select collection_zip_code from transaction where zip_code = (select receiver_zip_code from parcels where id = ?)',
        [parcel_id[0]],
      );
      let nextPoint = nextPoint_[0].collection_zip_code;
      let [n, _] = await pool.execute('select name from collection where zip_code = ?', [nextPoint]);
      let nextPoint_name = n[0].name;
      await pool.execute(
        'insert into parcel_package(parcel_package_id, sender_id, sender_name, receiver_id,receiver_name, sender_type, receiver_type,send_date, status, package_kind) values(?, ?, ?, ?, ?, ?, ?, ?, "Chờ xác nhận","in")',
        [package_id, sender_id, sender_name, nextPoint, nextPoint_name, type, 'Điểm tập kết', dateTime],
      );
    } else if (cur_pos == 2) {
      let [nextPoint_, __] = await pool.execute('select receiver_zip_code from parcels where id = ?', [parcel_id[0]]);
      let nextPoint = nextPoint_[0].receiver_zip_code;
      let [n, _] = await pool.execute('select name from transaction where zip_code = ?', [nextPoint]);
      let nextPoint_name = n[0].name;
      await pool.execute(
        'insert into parcel_package(parcel_package_id, sender_id, sender_name, receiver_id,receiver_name, sender_type, receiver_type,send_date, status, package_kind) values(?, ?, ?, ?, ?, ?, ?, ?, "Chờ xác nhận","in")',
        [package_id, sender_id, sender_name, nextPoint, nextPoint_name, type, 'Điểm giao dịch', dateTime],
      );
    }
    return res.status(200).json({ package_id: package_id });
  } catch (err) {
    console.log(err);
  }
};

let createTransactionPackage = async (req, res) => {
  try {
    let { parcel_id, sender_id, sender_name, type } = req.body.data;
    let package_id = generateString(6);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    let [c, _] = await pool.execute('select cur_pos from parcels where id = ?', [parcel_id[0]]);
    let cur_pos = c[0].cur_pos;
    if (cur_pos == 0) {
      let [nextPoint_, __] = await pool.execute(
        'select collection_zip_code from transaction where zip_code = (select sender_zip_code from parcels where id = ?)',
        [parcel_id[0]],
      );
      let nextPoint = nextPoint_[0].collection_zip_code;
      let [n, _] = await pool.execute('select name from collection where zip_code = ?', [nextPoint]);
      let nextPoint_name = n[0].name;
      await pool.execute(
        'insert into parcel_package(parcel_package_id, sender_id, sender_name, receiver_id,receiver_name, sender_type, receiver_type,send_date, status, package_kind) values(?, ?, ?, ?, ?, ?, ?, ?, "Chờ xác nhận","in")',
        [package_id, sender_id, sender_name, nextPoint, nextPoint_name, type, 'Điểm tập kết', dateTime],
      );
    }
    return res.status(200).json({ package_id: package_id });
  } catch (err) {
    console.log(err);
  }
};
export default {
  createStaffTransAccount,
  createStaffCollAccount,
  deleteStaffTransAccount,
  deleteStaffCollAccount,
  getTransactionList,
  getCollectionList,
  createParcel,
  sendParcel,
  confirmParcel,
  searchParcel,
  addTransaction,
  addCollection,
  getArrivalParcelPackage,
  getPackageDetail,
  sendPackage,
  confirmCollecionPackage,
  confirmTransactionPackage,
  getCollectionPackageDetail,
  getTransactionPackageDetail,
  createCollectionPackage,
  createTransactionPackage,
  getSendedParcelPackage,
};
