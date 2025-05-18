import React, { useRef, useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./styles.css";
import { FaWindowClose } from "react-icons/fa";
import { billUrl } from "../../API/APILinks";

const InvoicePreview = ({ invoice, productList, close }) => {
  const printRef = useRef();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sumTotal = invoice.items.reduce(
      (sum, item) => sum + item?.unitPrice * item?.quantity,
      0
    );
    setSubtotal(sumTotal);
    setTotal(invoice?.invoice?.total);
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

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-4 print:w-full print:max-w-full print:p-0">
      {/* Close Button (hidden when printing) */}
      <button
        onClick={close}
        className="absolute right-4 top-4 text-gray-600 hover:text-red-500 text-xl print:hidden"
        aria-label="Close"
      >
        <FaWindowClose />
      </button>

      <div ref={printRef} className="text-black">
        <h2 className="text-2xl font-bold text-center mb-2">INVOICE</h2>

        {/* Meta Info */}
        <div className="mb-2 text-xs">
          <div className="flex justify-between">
            <span>
              <strong>Date:</strong>{" "}
              {new Date(invoice.invoice.createdAt || invoice?.invoice?.updatedAt).toLocaleDateString()}{" "}
              {new Date(invoice.invoice.createdAt || invoice?.invoice?.updatedAt).toLocaleTimeString()}
            </span>
            <span>
              <strong>Payment:</strong> {invoice?.invoice?.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              <strong>Invoice No:</strong> {invoice?.invoice?.id}
            </span>
            <span>
              <strong>Customer:</strong> {invoice?.invoice?.customerId}
            </span>
          </div>
        </div>

        {/* Table */}
        <div style={{maxHeight: '40vh', overflow: 'auto'}}>
          <table className="w-full text-xs border-t border-b border-gray-300 my-2">
            <thead>
              <tr className="bg-gray-100">
                <th>Item</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items.map((item, idx) => {
                const product = productList.find((p) => p?.id === item?.productId);
                return (
                  <tr key={idx}>
                    <td>{product?.name}</td>
                    <td>{item.quantity}</td>
                    <td>{product?.unit}</td>
                    <td>Rs.{item?.unitPrice?.toFixed(2)}</td>
                    <td>{item?.discount}%</td>
                    <td>Rs.{item?.amount?.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="text-right my-2 text-sm">
          <div>
            <strong>Subtotal:</strong> Rs.{subtotal.toFixed(2)}
          </div>
          <div>
            <strong>Discount:</strong> Rs.{(subtotal - total).toFixed(2)}
          </div>
          <div>
            <strong>Grand Total:</strong> Rs.{total.toFixed(2)}
          </div>
        </div>

        {/* QR Code (centered, black on white) */}
        <div className="flex justify-center my-2">
          <QRCodeSVG
            value={`${billUrl}/bill.html?invoice=${invoice?.invoice?.id}&customer=${invoice?.invoice?.customerId}`}
            size={80}
            bgColor="#fff"
            fgColor="#000"
          />
        </div>
      </div>

      <div className="flex justify-center mt-2 print:hidden">
        <button
          className="bg-black text-white px-6 py-2 rounded shadow-md"
          onClick={handlePrint}
        >
          Print Invoice
        </button>
      </div>
    </div>
  </div>
);
};

export default InvoicePreview;
