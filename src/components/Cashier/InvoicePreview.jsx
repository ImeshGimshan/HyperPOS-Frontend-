import React, { useRef } from "react";
import QRCode from "qrcode.react";
import "./styles.css";

const InvoicePreview = ({ invoice }) => {
  const printRef = useRef();

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

  return (
    <div className="invoice-panel">
      <div ref={printRef}>
        <h2 className="invoice-title">INVOICE</h2>

        <div className="invoice-meta">
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Invoice No:</strong> {invoice.number}</p>
          <p><strong>Customer:</strong> {invoice.customer}</p>
        </div>

        <table className="invoice-table">
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
            {invoice.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>Rs.{item.price.toFixed(2)}</td>
                <td>Rs.{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <p><strong>Subtotal:</strong> Rs.{invoice.subtotal.toFixed(2)}</p>
          <p><strong>Discount:</strong> Rs.{invoice.discount.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> Rs.{invoice.grandTotal.toFixed(2)}</p>
          <p><strong>Cash:</strong> Rs.{invoice.cash.toFixed(2)}</p>
          <p><strong>Change:</strong> Rs.{invoice.change.toFixed(2)}</p>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <QRCode value={`Invoice: ${invoice.number}, Total: Rs.${invoice.grandTotal}`} />
          <p style={{ marginTop: "6px", fontSize: "12px" }}>Scan for Payment</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button className="print-btn" onClick={handlePrint}>Print Invoice</button>
      </div>
    </div>
  );
};

export default InvoicePreview;
