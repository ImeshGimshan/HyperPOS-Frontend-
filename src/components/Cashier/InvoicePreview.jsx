import { useRef, useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./styles.css";
import { FaWindowClose } from "react-icons/fa";

const InvoicePreview = ({
  invoice,
  productList,
  setPrintInvoice,
  newInvoice,
}) => {
  const printRef = useRef();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sumTotal = invoice.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    setSubtotal(sumTotal);
    setTotal(invoice.invoice.total);
  }, [invoice]);
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "", "width=800,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            h2 { text-align: center; }
            .total { text-align: right; margin-top: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };
  const handleClose = () => {
    newInvoice();
  };

  return (
    <div className="cashier-invoice-panel absolute">
      <div ref={printRef}>
        <button
          onClick={() => handleClose()}
          className=" right-5 top-5 absolute"
        >
          <FaWindowClose className="text-red-500 scale-200" />
        </button>
        <h2 className="cashier-invoice-title w-full">INVOICE</h2>

        <div className="cashier-invoice-meta">
          <div className="flex flex-row justify-between">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                invoice.invoice.createdAt || invoice.invoice.updatedAt
              ).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(
                invoice.invoice.createdAt || invoice.invoice.updatedAt
              ).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>
              <strong>Invoice No:</strong> {invoice.invoice.id}
            </p>
            <p>
              <strong>Customer:</strong> {invoice.invoice.customerId}
            </p>
          </div>
        </div>
        <div className="max-h-[40vh] overflow-scroll">
          <table className="cashier-invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items.map((item, idx) => (
                <tr key={idx}>
                  {productList
                    .filter((product) => product.id === item.productId)
                    .map((product) => (
                      <td key={product.id}>{product.name}</td>
                    ))}
                  <td>{item.quantity}</td>
                  {productList
                    .filter((product) => product.id === item.productId)
                    .map((product) => (
                      <td key={product.id}>{product.unit}</td>
                    ))}

                  <td>Rs.{item.unitPrice.toFixed(2)}</td>
                  <td>Rs.{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cashier-invoice-total right-0">
          <p>
            <strong>Subtotal:</strong> Rs.{subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Discount:</strong> Rs.
            {(subtotal - total).toFixed(2)}
          </p>
          <p>
            <strong>Grand Total:</strong> Rs.{total}
          </p>
          {/* <p>
            <strong>Cash:</strong> Rs.{invoice?.cash?.toFixed(2)}
          </p>
          <p>
            <strong>Change:</strong> Rs.{invoice?.change?.toFixed(2)}
          </p> */}
        </div>

        <div className="hidden">
          <QRCodeSVG
            value={`Invoice: ${invoice.invoice.id}, Total: Rs.${invoice.invoice.total}`}
          />
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button className="cashier-print-btn" onClick={handlePrint}>
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;
