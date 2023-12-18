import pool from '../configs/connectDB.js';

// Tạo tài khoản cho nhân viên tại điểm giao dịch
// Đầu vào chứa các thông tin của nhân viên: Username, password, phone, email, transaction_zip_code
let createStaffTransAccount = async (req, res) => {
  let data = req.body.data;
  let keys = Object.keys(data);
  let column_list = keys.join(',');
  const mark = '?,'.repeat(keys.length - 1) + '?';
  const values = keys.map((key) => data[key]);
  await pool.execute(`insert into staff_transaction(${column_list}) values(` + `${mark}` + `)`, values);
  console.log('Success');
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
  await pool.execute(`insert into parcels(${column_list}) values(` + `${mark}` + `)`, values);
  await pool.execute(
    `insert into transaction_stock(transaction_zip_code,parcel_id, sender_col_zip_code, status, type, is_confirm) values(?,?,?,?,?,?)`,
    [data.sender_zip_code, data.parcel_id, null, 'Chờ gửi', 'in', 1],
  );
  console.log('Success');
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
  let kind_point = data.kind_point;
  console.log(data);
  if (kind_point == 'transaction') {
    let parcel_id = data.parcel_id;
    let trans_id = data.trans_id;
    await pool.execute(
      'update transaction_stock set status = "Đang gửi",type = "out",send_time = ?  where parcel_id = ?',
      [dateTime, parcel_id],
    );
    let col_id = await pool.execute('SELECT collection_zip_code from transaction where zip_code = ?', [trans_id]);
    await pool.execute(
      "insert into collection_stock (collection_zip_code,parcel_id,sender_transaction_zip_code,status,type,is_confirm) values(?,?,?,'Chờ gửi','in',0)",
      [col_id[0][0].collection_zip_code, parcel_id, trans_id],
    );
    await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);

    // let a = await pool.execute(
    //   'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
    //   [trans_id],
    // );
    // let jsonData = a[0];
    console.log('Send Parcel Success');
  } else {
    let cur_pos = data.cur_pos;
    console.log(cur_pos);
    if (cur_pos == 1) {
      let parcel_id = data.parcel_id;
      let coll_id = data.coll_id;
      let [row, field] = await pool.execute(
        'select collection_zip_code from transaction where zip_code = (select receiver_zip_code from parcels where id = ?)',
        [parcel_id],
      );
      await pool.execute(
        'update collection_stock set status = "Đang gửi",type = "out", send_time = ? where parcel_id = ?',
        [dateTime, parcel_id],
      );
      await pool.execute(
        "insert into collection_stock (collection_zip_code,parcel_id,sender_col_zip_code,status,type,is_confirm) values(?,?,?,'Chờ gửi','in',0)",
        [row[0].collection_zip_code, parcel_id, coll_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);

      // let a = await pool.execute(
      //   'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
      //   [coll_id],
      // );
      console.log('Send Parcel success');
    }
    if (cur_pos == 2) {
      let parcel_id = data.parcel_id;
      let coll_id = data.coll_id;
      let [row, field] = await pool.execute('select receiver_zip_code from parcels where id = ?', [parcel_id]);
      await pool.execute(
        'update collection_stock set status = "Đang gửi",type = "out",send_time = ? where parcel_id = ? and collection_zip_code = ?',
        [dateTime, parcel_id, coll_id],
      );
      await pool.execute(
        "insert into transaction_stock (transaction_zip_code,parcel_id,sender_col_zip_code,status,type,is_confirm) values(?,?,?,'Chờ gửi','in',0)",
        [row[0].receiver_zip_code, parcel_id, coll_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);

      // let a = await pool.execute(
      //   'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
      //   [coll_id],
      // );
      console.log('Send Parcel Success');
      // let jsonData = a[0];
      // return res.render('collection.ejs', { data: jsonData, coll_id: coll_id });
    }
    return res.send('Fail');
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
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;

  let data = req.body.data;
  let kind_point = data.kind_point;
  if (kind_point == 'transaction') {
    let cur_pos = data.cur_pos;
    if (cur_pos == 3) {
      let parcel_id = data.parcel_id;
      let sender = data.sender_zip_code;
      let trans_id = data.trans_id;
      await pool.execute(
        "update collection_stock set status = 'Đã gửi thành công',is_confirm = 1 where parcel_id = ? and collection_zip_code = ?",
        [parcel_id, sender],
      );
      await pool.execute(
        "update transaction_stock set status = 'Chờ gửi đến người nhận hàng',type='out',is_confirm = 1,receive_time = ? where parcel_id = ? and transaction_zip_code = ?",
        [dateTime, parcel_id, trans_id],
      );

      // let a = await pool.execute(
      //   'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
      //   [trans_id],
      // );
      // let jsonData = a[0];
      // return res.render('trans.ejs', { data: jsonData, trans_id: trans_id });
    }
    // return res.send('Fail');
  } else {
    let cur_pos = data.cur_pos;
    if (cur_pos == 1) {
      let parcel_id = data.parcel_id;
      let coll_id = data.coll_id;
      let sender = data.sender_zip_code;
      await pool.execute(
        "update transaction_stock set status = 'Đã gửi thành công',is_confirm = 1 where parcel_id = ? and transaction_zip_code = ?",
        [parcel_id, sender],
      );
      await pool.execute(
        'update collection_stock set is_confirm = 1,receive_time = ? where parcel_id = ? and sender_transaction_zip_code = ?',
        [dateTime, parcel_id, sender],
      );
      // let a = await pool.execute(
      //   'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
      //   [coll_id],
      // );
      // let jsonData = a[0];
      // return res.render('collection.ejs', { data: jsonData, coll_id: coll_id });
    }
    if (cur_pos == 2) {
      let parcel_id = data.parcel_id;
      let coll_id = data.coll_id;
      let sender = data.sender_col_zip_code;
      console.log(coll_id);
      console.log(sender);
      await pool.execute(
        "update collection_stock set status = 'Đã gửi thành công',is_confirm = 1 where parcel_id = ? and collection_zip_code = ?",
        [parcel_id, sender],
      );
      await pool.execute(
        'update collection_stock set is_confirm = 1,receive_time = ? where parcel_id = ? and collection_zip_code = ?',
        [dateTime, parcel_id, coll_id],
      );
      let a = await pool.execute(
        'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
        [coll_id],
      );
      let jsonData = a[0];
      return res.render('collection.ejs', { data: jsonData, coll_id: coll_id });
    }
  }
  return res.send('Fail');
};

let searchParcel = async (req, res) => {
  let { parcel_id } = req.query;
  let [parcel_info, field] = await pool.execute('select * from parcels where id = ?', [parcel_id]);
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
      info.push({ name: 'Đang xử lí', time: trans_info.receive_time, address: f_trans_address[0][0].address });
    }
    // } else {
    //   info.push({ name: 'Đang chuyển hàng', time: trans_info.send_time, address: trans_address[0][0].address });
    // }
  }
  if (cur_pos > 0) {
    info.push({ name: 'Đã rời', time: trans_info[0].send_time, address: f_trans_address[0][0].address });
    if (coll_info[0].is_confirm == 1) {
      info.push({ name: 'Đang tại', time: coll_info[0].receive_time, address: f_colls_address[0][0].address });
    }
  }
  if (cur_pos > 1) {
    // console.log(coll_info);
    info.push({ name: 'Đã rời', time: coll_info[0].send_time, address: f_colls_address[0][0].address });
    if (coll_info[1].is_confirm == 1) {
      info.push({ name: 'Đang tại', time: coll_info[1].receive_time, address: l_colls_address[0][0].address });
    }
  }
  if (cur_pos > 2) {
    console.log(trans_info);
    info.push({ name: 'Đã rời', time: coll_info[1].send_time, address: l_colls_address[0][0].address });
    console.log(trans_info);
    if (trans_info[1].is_confirm == 1) {
      info.push({ name: 'Đang tại', time: trans_info[1].receive_time, address: l_trans_address[0][0].address });
    }
  }

  return res.json({ data: parcel_info, info: info });
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
  // await pool.execute('insert into collection values(?,?,?,?)', [
  //   data.ProvinceID,
  //   data.ProvinceName,
  //   +data.Code,
  //   data.NameExtension[1],
  // ]);
  //
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
};
