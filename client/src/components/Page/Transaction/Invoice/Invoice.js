import styles from './Invoice.module.scss';
import classNames from 'classnames/bind';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { useRef, useState } from 'react';
import RowFlexTwoColumnWithFloat from '~/components/Page/Transaction/Invoice/components/RowFlexTwoColumnWithFloat';
import Logo from 'src/components/logo';
import CheckBoxCustom from '~/components/Page/Transaction/Invoice/components/CheckBoxCustom';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

const options = {
  // default is `save`
  method: 'open',
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.MEDIUM,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.NONE,
    // default is 'A4'
    format: 'A4',
    // default is 'portrait'
    orientation: 'landscape',
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: 'image/png',
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};
const cx = classNames.bind(styles);

const Invoice = ({senderInfo, receiverInfo, productList,
                 packageProductInfo, note}) => {
  const [isLoading, setIsLoading] = useState(false);
  const exportPDF = async () => {
    setIsLoading(true);
    await generatePDF(invoiceRef, options);
    setIsLoading(false);
  };
  const invoiceRef = useRef();
  return (
    <>
      <div style={{
        height: 'fit-content',
        marginLeft: '1rem',
        marginRight: '1rem',
      }}>
        <Button style={{
          marginBottom: '1rem',
        }} variant='contained' color='inherit' onClick={() => exportPDF()}
        >
          Xuất giấy biên nhận
        </Button>
        {isLoading && <LinearProgress />}
      </div>

      <div className={cx(styles.mainPage)} ref={invoiceRef}>
        <div className={cx(styles.subPage)}>
          <div className={cx(styles.invoiceHeader)}>
            <Logo className={cx(styles.logo)}></Logo>
            <div className={cx(styles.QRCode)}>
              <div className={cx(styles.box)}>
                <img src='https://api.qrserver.com/v1/create-qr-code/?data=Khang!&size=65x65' alt={''} style={{
                  width: '65px',
                  height: '65px',
                }}></img>
                <span>MAVANDONDNDB</span>
              </div>
            </div>
          </div>
          <div className={cx(styles.invoiceBody)}>
            <table className={cx(styles.table)}>
              <tbody>
              <tr>
                <td
                  className={cx(styles.td)}
                  style={{
                    width: '50%',
                    height: '25%',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        flex: '3',
                      }}
                    >
                      <div className={cx(styles.title)}>1. Họ tên địa chỉ người gửi</div>
                      <p>{senderInfo.name} - {senderInfo.province.name} - {senderInfo.district.name} - {senderInfo.ward.name}</p>
                    </div>
                    <div
                      style={{
                        flex: '1',
                      }}
                    >
                      <p><span className={cx(styles.bold)}>Điện thoại: </span> {senderInfo.phoneNumber}</p>
                    </div>
                    <div
                      style={{
                        flex: '1',
                      }} className={cx(styles.flexTwoColumn)}
                    >
                      <p className={cx(styles.left)}>
                        <span className={cx(styles.bold)}>Mã khách hàng: </span>{senderInfo.phoneNumber}
                      </p>
                      <p className={cx(styles.right)}>
                        <span className={cx(styles.bold)}>Mã bưu chính: </span>{localStorage.getItem('zip_code')}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className={cx(styles.td)}
                  style={{
                    width: '50%',
                    height: '25%',
                  }}
                  colspan='2'
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        flex: '3',
                      }}
                    >
                      <div className={cx(styles.title)}>2. Họ tên địa chỉ người nhận</div>
                      <p>{receiverInfo.name} - {receiverInfo.province.name} - {receiverInfo.district.name} - {receiverInfo.ward.name}</p>
                    </div>
                    <div
                      style={{
                        flex: '1',
                      }}
                    >
                    </div>
                    <div
                      style={{
                        display: 'flex',
                      }}
                      className={cx(styles.flexTwoColumn)}
                    >
                      <p className={cx(styles.left)}>
                        <span className={cx(styles.bold)}>Mã khách hàng: </span>{receiverInfo.phoneNumber}
                      </p>
                      <p className={cx(styles.right)}>
                        <span className={cx(styles.bold)}>Điện thoại: </span> {receiverInfo.phoneNumber}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={cx(styles.td)} rowSpan={'2'}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <div>
                      <div className={cx(styles.title)}> 3. Loại hàng gửi</div>
                      <div
                        style={{
                          flex: '1',
                        }}

                      >
                        <CheckBoxCustom label={'Tài liệu'} checked={false}></CheckBoxCustom>
                        <CheckBoxCustom label={'Hàng hoá'} checked={false}></CheckBoxCustom>
                      </div>
                    </div>
                    <div>
                      <div className={cx(styles.title)}>4. Nội dung giá trị bưu gửi</div>
                      <table
                        className={cx(styles.table)}
                        style={{
                          height: '70%',
                        }}
                      >
                        <thead>
                        <tr className={cx(styles.bold)}>
                          <td className={cx(styles.td)}>Tên</td>
                          <td className={cx(styles.td)}>Cân nặng</td>
                          <td className={cx(styles.td)}>Số lượng</td>
                        </tr>
                        </thead>
                        <tbody>
                        {productList.map((item)=>{
                          return <tr>
                            <td className={cx(styles.td)}>{item.name}</td>
                            <td className={cx(styles.td)}>{item.weight}</td>
                            <td className={cx(styles.td)}>{item.quantity}</td>
                          </tr>
                        })}

                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div className={cx(styles.title)}>5. Dịch vụ đặc biệt/ Cộng thêm</div>
                      <p>

                      </p>
                    </div>
                  </div>
                </td>
                <td className={cx(styles.td)} rowspan='2'>
                  <div className={cx(styles.title)}>9. Cước</div>
                  <RowFlexTwoColumnWithFloat label={'a. Cước chính'} amount={packageProductInfo.fee.service_fee}></RowFlexTwoColumnWithFloat>
                  <RowFlexTwoColumnWithFloat label={'b. Phụ phí'} amount={packageProductInfo.fee.insurance_fee}></RowFlexTwoColumnWithFloat>
                  <div className={cx(styles.bold)}>
                    <RowFlexTwoColumnWithFloat label={'c. Tổng thu'} amount={packageProductInfo.fee.total}></RowFlexTwoColumnWithFloat>
                  </div>

                </td>
                <td className={cx(styles.td)}>
                  <div className={cx(styles.title)}>10. Khối lượng(kg)</div>

                  <RowFlexTwoColumnWithFloat label={'Khối lượng thực tế'} amount={packageProductInfo.weight}></RowFlexTwoColumnWithFloat>
                  <RowFlexTwoColumnWithFloat label={'Khối lượng quy đổi'} amount={0}></RowFlexTwoColumnWithFloat>
                </td>
              </tr>
              <tr>
                {/* <td className={cx(styles.td)}>ABC2</td> */}
                <td className={cx(styles.td)} rowspan='2'>
                  <div className={cx(styles.title)}>12. Chú dẫn nghiệp vụ</div>
                </td>
              </tr>
              <tr>
                <td className={cx(styles.td)}>
                  <div className={cx(styles.title)}>6. Chỉ dẫn của người gửi khi không phát được bưu gửi</div>
                  <p>
                    <CheckBoxCustom label={'Chuyển hoàn ngay'} checked={false}></CheckBoxCustom>
                    <CheckBoxCustom label={'Gọi điện cho người gửi'} checked={false}></CheckBoxCustom>
                    <CheckBoxCustom label={'Huỷ'} checked={false}></CheckBoxCustom>
                  </p>
                </td>
                <td className={cx(styles.td)}>
                  <div className={cx(styles.title)}> 11. Thu của người nhận</div>
                  <RowFlexTwoColumnWithFloat label={'COD'} amount={packageProductInfo.sumOfCOD}></RowFlexTwoColumnWithFloat>
                  <RowFlexTwoColumnWithFloat label={'Tổng thu'} amount={packageProductInfo.sumOfCOD}></RowFlexTwoColumnWithFloat>
                </td>
              </tr>
              <tr>
                <td className={cx(styles.td)}>
                  <div>
                    <div className={cx(styles.title)}>7. Cam kết của người gửi</div>
                    <p style={{
                      fontSize: '0.875rem',
                    }}>
                      Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt
                      hàng nguy hiểm, cầm gửi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả
                      cước chuyển hoàn
                    </p>
                    <div className={cx(styles.title)}>8. Ngày giờ gửi Chữ ký người gửi</div>
                    <p>
                      {new Date().toISOString()}
                    </p>
                  </div>
                </td>
                <td className={cx(styles.td, styles.textCenter)}>
                  <div className={cx(styles.title)}>13. Bưu cục chấp nhận</div>
                  <div>Chữ ký GDV nhận</div>
                </td>

                <td className={cx(styles.td)}>
                  <div className={cx(styles.title)}>14. Ngày giờ nhận</div>
                  <p className={cx(styles.bold)}>-------------</p>
                  <div className={cx(styles.textCenter)}>
                    <p>Người nhận/ Người được uỷ quyền</p>
                    <p>(Ký, ghi rõ họ tên)</p>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
