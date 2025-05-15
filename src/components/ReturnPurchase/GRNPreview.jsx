import React from "react";

const GRNPreview = ({ grn, productList, close }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">GRN Return Preview</h2>
          <button
            onClick={close}
            className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="border-b border-gray-200 pb-2 mb-4">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">GRN Return #: {grn?.grn?.id}</p>
              <p>Supplier ID: {grn?.grn?.supplierId}</p>
            </div>
            <div>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <table className="w-full">
            <thead className="border-b border-gray-300">
              <tr className="text-left">
                <th className="py-2">Item</th>
                <th className="py-2">Unit</th>
                <th className="py-2">Price</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Discount</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grn?.items?.map((item, index) => {
                const product = productList?.find(
                  (p) => p.id === item.productId
                );
                const itemTotal =
                  item.unitCost * item.quantity * (1 - item.discount / 100);

                return (
                  <tr key={index}>
                    <td className="py-2">{product?.name || "Unknown Product"}</td>
                    <td className="py-2">{product?.unit || "N/A"}</td>
                    <td className="py-2">Rs. {Number(item.unitCost).toFixed(2)}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.discount}%</td>
                    <td className="py-2 text-right">
                      Rs. {Number(itemTotal).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-300 pt-2">
          <div className="flex justify-between font-bold">
            <span>Total Return Amount:</span>
            <span>
              Rs.{" "}
              {grn?.items
                ?.reduce(
                  (sum, item) =>
                    sum +
                    item.unitCost * item.quantity * (1 - item.discount / 100),
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="font-semibold">Remarks:</p>
          <p className="text-gray-700">{grn?.grn?.remarks || "No remarks"}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print GRN Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default GRNPreview;