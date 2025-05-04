import React, { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Product A', barcode: '123456', unit: 'pcs', price: 100, discount: 10 },
  { id: 2, name: 'Product B', barcode: '234567', unit: 'box', price: 250, discount: 5 },
  { id: 3, name: 'Product C', barcode: '345678', unit: 'kg', price: 75, discount: 0 },
];

const ProductSearch = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (barcode) {
      const found = products.find(p => p.barcode === barcode.trim());
      if (found) {
        setSelectedProductId(found.id.toString());
        setSearchTerm(found.name);
      }
    }
  }, [barcode]);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm]);

  const selectedProduct = products.find(
    p => p.id === parseInt(selectedProductId)
  );

  const unit = selectedProduct?.unit || '';
  const price = selectedProduct?.price || 0;
  const discount = selectedProduct?.discount || 0;
  const total = ((price * quantity) * (1 - discount / 100)).toFixed(2);

  const handleAdd = () => {
    if (selectedProduct && quantity > 0) {
      onAdd({
        id: Date.now(),
        name: selectedProduct.name,
        price: selectedProduct.price,
        unit: selectedProduct.unit,
        quantity,
        discount: selectedProduct.discount,
        total: parseFloat(total),
      });

      setSearchTerm('');
      setSelectedProductId('');
      setQuantity(1);
      setBarcode('');
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="search-section space-y-2">
        <input
          type="text"
          placeholder="Search Item by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Scan or Enter Barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {suggestions.length > 0 && searchTerm && (
          <ul className="suggestions-list border border-gray-300 bg-white max-h-40 overflow-y-auto rounded shadow-md mt-1">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                onClick={() => {
                  setSelectedProductId(product.id.toString());
                  setSearchTerm(product.name);
                  setBarcode(product.barcode);
                }}
              >
                {product.name} ({product.barcode})
              </li>
            ))}
          </ul>
        )}

        <div className="product-info mt-2">
          <div>
            <p>Unit: {unit}</p>
            <p>Price: Rs. {price.toFixed(2)}</p>
            <p>Discount: {discount}%</p>
          </div>
          <div>
            <p>Total: Rs. {total}</p>
          </div>
        </div>

        <div className="add-controls mt-4 flex gap-2 items-center">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Item</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border p-2 w-20 rounded"
          />

          <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
