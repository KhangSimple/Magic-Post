class Parcel {
  constructor(
    id,
    createdTime,
    weight,
    length,
    width,
    height,
    sender_name,
    sender_phone,
    sender_address,
    receiver_name,
    receiver_phone,
    receiver_address,
    sender_zip_code,
    receiver_zip_code,
    cod_amount,
    cost,
    note,
    required_note,
    items,
    cur_pos,
  ) {
    this.id = id;
    this.createdTime = createdTime;
    this.weight = weight;
    this.length = length;
    this.width = width;
    this.height = height;
    this.sender_name = sender_name;
    this.sender_phone = sender_phone;
    this.sender_address = sender_address;
    this.receiver_name = receiver_name;
    this.receiver_phone = receiver_phone;
    this.receiver_address = receiver_address;
    this.sender_zip_code = sender_zip_code;
    this.receiver_zip_code = receiver_zip_code;
    this.cod_amount = cod_amount;
    this.cost = cost;
    this.note = note;
    this.required_note = required_note;
    this.items = items;
    this.cur_pos = cur_pos;
  }
  setParcel(
    parcel_id,
    createdTime,
    sender_zip_code,
    receiver_zip_code,
    senderInfo,
    receiverInfo,
    productList,
    packageProductInfo,
    note,
  ) {
    this.id = parcel_id;
    this.createdTime = createdTime;
    this.weight = packageProductInfo.weight;
    this.length = packageProductInfo.length;
    this.width = packageProductInfo.width;
    this.height = packageProductInfo.height;
    this.sender_name = senderInfo.name;
    this.sender_phone = senderInfo.phoneNumber;
    this.sender_address = senderInfo.ward.name + '/' + senderInfo.district.name + '/' + senderInfo.province.name;
    this.receiver_name = receiverInfo.name;
    this.receiver_phone = receiverInfo.phoneNumber;
    this.receiver_address =
      receiverInfo.ward.name + '/' + receiverInfo.district.name + '/' + receiverInfo.province.name;
    this.sender_zip_code = sender_zip_code;
    this.receiver_zip_code = receiverInfo.district.id;
    this.cod_amount = packageProductInfo.sumOfCOD;
    this.cost = packageProductInfo.fee.total;
    this.note = note.note;
    this.required_note = note.requiredNote;
    this.items = JSON.stringify(productList);
    this.cur_pos = 0;
  }
}

export default Parcel;
