import Parcel from '../Object/Parcel/index.js';
import { generateString } from './apiController.js';

let createParcel = async (req, res) => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;

  let data = req.body.data;
  console.log(data);
  let parcel = new Parcel();
  parcel.setParcel(
    generateString(5),
    dateTime,
    '1442',
    data.senderInfo,
    data.receiverInfo,
    data.productList,
    data.packageProductInfo,
    data.note,
  );
  // const propertyNames = Object.keys(parcel);
  // for (const name of propertyNames) {
  //   const value = parcel[name];
  //   console.log(`Tên: ${name}, Giá trị: ${value}`);
  // }
  let keys = Object.keys(parcel);
  let column_list = keys.join(',');
  // const mark = '?,'.repeat(keys.length - 1) + '?';
  // const values = keys.map((key) => data[key]);
  // await pool.execute(`insert into parcels(${column_list}) values(` + `${mark}` + `)`, values);
  // await pool.execute(
  //   `insert into transaction_stock(transaction_zip_code,parcel_id, sender_col_zip_code, status, type, is_confirm) values(?,?,?,?,?,?)`,
  //   [data.sender_zip_code, data.parcel_id, null, 'Chờ gửi', 'in', 1],
  // );
  console.log('Success');
};
