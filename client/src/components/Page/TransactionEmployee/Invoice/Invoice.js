import styles from './Invoice.module.scss';
import classNames from 'classnames/bind';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { useRef } from 'react';
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
const Invoice = () => {
  const invoiceRef = useRef();
  return (
    <>
      <button onClick={() => generatePDF(invoiceRef, options)}>Generate PDF</button>
      <div className={cx(styles.mainPage)} ref={invoiceRef}>
        {console.log(styles)}
        <div className={cx(styles.subPage)}>
          <div className={cx(styles.invoiceHeader)}>
            <div className={cx(styles.logo)}>
              <img
                src="https://images.careerbuilder.vn/employer_folders/lot9/237439/130655logo.jpg"
                height={'65px'}
              ></img>
            </div>
            <div className={cx(styles.QRCode)}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?data=Khang!&size=65x65"></img>
              <br></br>
              <span>MAVANDONDNDB</span>
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
                        <p
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          1. Họ tên địa chỉ người gửi
                        </p>
                        <p>Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội</p>
                      </div>
                      <div
                        style={{
                          flex: '1',
                        }}
                      >
                        <p>Điện thoại: 0914508451</p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flex: '1',
                        }}
                      >
                        <p
                          style={{
                            flex: 1,
                          }}
                        >
                          Mã khách hàng: 0914508451
                        </p>
                        <p
                          style={{
                            flex: 1,
                          }}
                        >
                          Mã bưu chính: 0914508451
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
                    colspan="2"
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
                        <p
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          2. Họ tên địa chỉ người nhận
                        </p>
                        <p>Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội</p>
                      </div>
                      <div
                        style={{
                          flex: '1',
                        }}
                      >
                        <p>Mã ĐH:</p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flex: '1',
                        }}
                      >
                        <p
                          style={{
                            flex: 1,
                          }}
                        >
                          Mã khách hàng: 0914508451
                        </p>
                        <p
                          style={{
                            flex: 1,
                          }}
                        >
                          Điện thoại: 0914508451{' '}
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
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          3. Loại hàng gửi
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: '1',
                          }}
                        >
                          <p
                            style={{
                              flex: 1,
                            }}
                          >
                            Tài liệu
                          </p>
                          <p
                            style={{
                              flex: 1,
                            }}
                          >
                            Hàng hoá
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          4. Nội dung giá trị bưu gửi
                        </p>
                        <table
                          className={cx(styles.table)}
                          style={{
                            height: '70%',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td className={cx(styles.td)}>Nội dung</td>
                              <td className={cx(styles.td)}>Số lượng</td>
                              <td className={cx(styles.td)}>Trị giá</td>
                              <td className={cx(styles.td)}>Giấy tờ đính kèm</td>
                            </tr>
                            <tr>
                              <td className={cx(styles.td)}>a </td>
                              <td className={cx(styles.td)}>a </td>
                              <td className={cx(styles.td)}>a</td>
                              <td className={cx(styles.td)}>a </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          5. Dịch vụ đặc biệt/ Cộng thêm
                        </p>
                        <p>
                          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
                          graphic or web designs.
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={cx(styles.td)} rowspan="2"></td>
                  <td className={cx(styles.td)}>ABC1</td>
                </tr>
                <tr>
                  {/* <td className={cx(styles.td)}>ABC2</td> */}
                  <td className={cx(styles.td)} rowspan="2">
                    ABC3
                  </td>
                </tr>
                <tr>
                  <td className={cx(styles.td)}>
                    <p
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      6. Chỉ dẫn của người gửi khi không phát được bưu gửi
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </td>
                  <td className={cx(styles.td)}>ABC5</td>
                </tr>
                <tr>
                  <td className={cx(styles.td)}>
                    <div>
                      <p
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        7. Cam kết của người gửi
                      </p>
                      <p>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic
                        or web designs. The passage is attributed to an unknown typesetter in the 15th century who is
                        thought to have scrambled parts of Cicero's De Finibus Bonorum
                      </p>
                    </div>
                  </td>
                  <td className={cx(styles.td)}>ABC7</td>
                  <td className={cx(styles.td)}>ABC8</td>
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
