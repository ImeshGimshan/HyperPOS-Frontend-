import React from "react";

const CartTable = ({ cartItems, onQuantityChange, productList }) => {
  const calculateTotal = (price, quantity, discount) => {
    const total = price * quantity * (1 - discount / 100);
    return total > 0 ? total : 0;
  };

  return (
    <div className="w-full my-6 overflow-x-auto rounded-lg border border-purple-300 shadow-md max-h-[50vh]">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-purple-700 text-white">
          <tr>
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Unit</th>
            <th className="px-4 py-2">Discount</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-100 bg-white">
          {cartItems?.length > 0 ? (
            cartItems.map((item, index) => {
              const itemTotal = calculateTotal(
                item?.unitPrice,
                item?.quantity,
                item?.discount
              );

              return (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">
                    {
                      productList?.find(
                        (product) => product.id === item?.productId
                      )?.name
                    }
                  </td>
                  <td className="px-4 py-2">
                    Rs. {Number(item?.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item?.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          item?.id,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className="w-16 p-1 border border-purple-300 rounded bg-gray-100 text-center"
                    />
                  </td>
                  <td className="px-4 py-2">{
                      productList?.find(
                        (product) => product?.id === item?.productId
                      )?.unit
                    }</td>
                  <td className="px-4 py-2">{item?.discount}%</td>
                  <td className="px-4 py-2">
                    Rs. {Number(itemTotal).toFixed(2)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="px-4 py-2 text-center" colSpan="8">
                No items in cart.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
