import React from "react";

const CartTable = ({ cartItems, onRemove, onQuantityChange }) => {
  const calculateTotal = (price, quantity, discount) => {
    const total = price * quantity * (1 - discount / 100);
    return total > 0 ? total : 0;
  };

  return (
    <div className="rounded-2xl bg-black/30 border border-[#f472b6]/30 shadow-lg my-6 overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-purple-700/90 text-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Unit</th>
            <th className="px-4 py-2">Discount</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-100 bg-white/80">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const itemTotal = calculateTotal(
                item.unitPrice,
                item.quantity,
                item.discount
              );

              return (
                <tr key={index} className="hover:bg-[#f472b6]/10 transition">
                  <td className="px-4 py-2 text-center text-purple-900 font-bold">{index + 1}</td>
                  <td className="px-4 py-2 text-purple-900">{item.name}</td>
                  <td className="px-4 py-2 text-purple-900">
                    Rs. {Number(item.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10) || 1
                        )
                      }
                      className="w-16 p-1 border border-[#f472b6]/30 text-black rounded-xl bg-gray-100 text-center focus:border-[#f472b6] shadow transition"
                    />
                  </td>
                  <td className="px-4 py-2 text-purple-900">{item.unit}</td>
                  <td className="px-4 py-2 text-purple-900">{item.discount}%</td>
                  <td className="px-4 py-2 text-purple-900">
                    Rs. {Number(itemTotal).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="bg-[#f472b6] text-white px-2 py-1 rounded-xl hover:bg-pink-700 font-semibold shadow transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="px-4 py-2 text-center text-gray-400" colSpan="8">
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
