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
  let data = req.body.data;
  let kind_point = data.kind_point;
  console.log(data);
  if (kind_point == 'transaction') {
    let parcel_id = data.parcel_id;
    let trans_id = data.trans_id;
    await pool.execute('update transaction_stock set status = "Đang gửi",type = "out" where parcel_id = ?', [
      parcel_id,
    ]);
    let col_id = await pool.execute('SELECT collection_zip_code from transaction where zip_code = ?', [trans_id]);
    await pool.execute(
      "insert into collection_stock (collection_zip_code,parcel_id,sender_transaction_zip_code,status,type,is_confirm) values(?,?,?,'Chờ gửi','in',0)",
      [col_id[0][0].collection_zip_code, parcel_id, trans_id],
    );
    await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);

    let a = await pool.execute(
      'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
      [trans_id],
    );
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
      await pool.execute('update collection_stock set status = "Đang gửi",type = "out" where parcel_id = ?', [
        parcel_id,
      ]);
      await pool.execute(
        "insert into collection_stock (collection_zip_code,parcel_id,sender_col_zip_code,status,type,is_confirm) values(?,?,?,'Chờ gửi','in',0)",
        [row[0].collection_zip_code, parcel_id, coll_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);

      let a = await pool.execute(
        'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
        [coll_id],
      );
      console.log('Send Parcel success');
    }
    if (cur_pos == 2) {
      let parcel_id = data.parcel_id;
      let coll_id = data.coll_id;
      let [row, field] = await pool.execute('select receiver_zip_code from parcels where id = ?', [parcel_id]);
      await pool.execute(
        'update collection_stock set status = "Đang gửi",type = "out" where parcel_id = ? and collection_zip_code = ?',
        [parcel_id, coll_id],
      );
      await pool.execute(
        "insert into transaction_stock (transaction_zip_code,parcel_id,sender_col_zip_code,status,type,is_confirm) values(?,?,?,'Chờ gửi','in',0)",
        [row[0].receiver_zip_code, parcel_id, coll_id],
      );
      await pool.execute('update parcels set cur_pos = cur_pos + 1 where id = ?', [parcel_id]);

      let a = await pool.execute(
        'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
        [coll_id],
      );
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
        "update transaction_stock set status = 'Chờ khách đến nhận hàng',type='out',is_confirm = 2 where parcel_id = ? and transaction_zip_code = ?",
        [parcel_id, trans_id],
      );

      let a = await pool.execute(
        'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',
        [trans_id],
      );
      let jsonData = a[0];
      return res.render('trans.ejs', { data: jsonData, trans_id: trans_id });
    }
    return res.send('Fail');
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
        'update collection_stock set is_confirm = 1 where parcel_id = ? and sender_transaction_zip_code = ?',
        [parcel_id, sender],
      );
      let a = await pool.execute(
        'SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,cs.sender_transaction_zip_code,cs.sender_col_zip_code,cs.status,cs.type,cs.is_confirm from parcels join collection_stock as cs on parcels.id = cs.parcel_id where cs.collection_zip_code = ?',
        [coll_id],
      );
      let jsonData = a[0];
      return res.render('collection.ejs', { data: jsonData, coll_id: coll_id });
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
      await pool.execute('update collection_stock set is_confirm = 1 where parcel_id = ? and collection_zip_code = ?', [
        parcel_id,
        coll_id,
      ]);
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
};
