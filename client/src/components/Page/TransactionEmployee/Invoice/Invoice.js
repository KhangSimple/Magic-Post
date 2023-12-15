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
              <img src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=65x65"></img>
              <br></br>
              <span>MAVANDONDNDB</span>
            </div>
          </div>
          <div className={cx(styles.invoiceBody)}>
            <table className={cx(styles.table)}>
              <tbody>
                <tr>
                  <td className={cx(styles.td)} styles="50%">
                    ABC
                  </td>
                  <td className={cx(styles.td)} colspan="2">
                    ABC
                  </td>
                </tr>
                <tr>
                  <td className={cx(styles.td)}>ABC</td>
                  <td className={cx(styles.td)} rowspan="2">
                    ABC
                  </td>
                  <td className={cx(styles.td)}>ABC</td>
                </tr>
                <tr>
                  <td className={cx(styles.td)}>ABC</td>
                  <td className={cx(styles.td)} rowspan="2">
                    ABC
                  </td>
                </tr>
                <tr>
                  <td className={cx(styles.td)}>ABC</td>
                  <td className={cx(styles.td)}>ABC</td>
                </tr>
                <tr>
                  <td className={cx(styles.td)}>ABC</td>
                  <td className={cx(styles.td)}>ABC</td>
                  <td className={cx(styles.td)}>ABC</td>
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
