import pool from "../configs/connectDB.js";
import React from 'react';

let getTransactionPage = async (req,res) => {
    let a = await pool.execute('SELECT parcels.id,sender_name,receiver_name,sender_zip_code,receiver_zip_code,cur_pos,is_confirm,ts.sender_col_zip_code,ts.status,ts.type from parcels join transaction_stock as ts on parcels.id = ts.parcel_id where ts.transaction_zip_code = ?',[req.params.id]);
    let jsonData = a[0]
    return res.json({data:jsonData})
}

export default {
    getTransactionPage
}