import { useState, useEffect } from "react";
import { getProductStock } from "../../API/APIProducts";

const ProductSearch = ({ onAdd, invoice,setProductList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barcode, setBarcode] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);


  //length
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await getProductStock();
      setProducts(response);
      setProductList(response);
    } catch (error) {
      console.error("Error fetching product stock:", error);
    }
  };

  useEffect(() => {
    if (barcode) {
      const found = products?.find((p) => p?.barcode === barcode.trim());
      if (found) {
        setSelectedProductId(found?.id.toString());
        setSearchTerm(found?.name);
      }
    }
  }, [barcode]);

  useEffect(() => {
    const filtered = products?.filter((p) =>
      p?.name.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm]);

  const selectedProduct = products?.find(
    (p) => p?.id === parseInt(selectedProductId)
  );

  const unit = selectedProduct?.unit || "";
  const price = selectedProduct?.price || 0;
  const discount = selectedProduct?.discount || 0;
  const amount = (price * quantity * (1 - discount / 100)).toFixed(2);

  const handleAdd = () => {

    if (selectedProduct && quantity > 0) {
      onAdd({
        invoiceId: invoice?.id,
        productId: selectedProduct?.id,
        name: selectedProduct?.name,
        unitPrice: selectedProduct?.price,
        costPrice: selectedProduct?.cost,
        unit: selectedProduct?.unit,
        quantity,
        discount: selectedProduct?.discount,
        amount: parseFloat(amount),
      });

      setSearchTerm("");
      setSelectedProductId("");
      setQuantity(1);
      setBarcode("");
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="search-section space-y-2 ">
        <div className="flex flex-col md:flex-row justify-between gap-2">
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
          className="border p-2 rounded w-full "
        /></div>

        {suggestions?.length > 0 && searchTerm && (
          <ul className="suggestions-list border border-gray-300 bg-purple-900 max-h-40 overflow-y-auto rounded shadow-md mt-1 absolute">
            {suggestions?.map((product) => (
              <li
                key={product?.id}
                className="cursor-pointer hover:bg-purple-500 px-2 py-1 flex justify-between"
                onClick={() => {
                  setSelectedProductId(product?.id);
                  setSearchTerm(product?.name);
                  setBarcode(product?.barcode);
                }}
              >
                <span>{product?.name}</span>
                <span>| {product?.stock}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="product-info mt-2 flex flex-col md:flex-row justify-between mt-10">
          <div className="flex flex-row justify-between w-full min-h-12">
            <p>Unit: {unit}</p>
            <p>Price: Rs. {price?.toFixed(2)}</p>
            <p>Discount: {discount}%</p>
            <p>Total: Rs. {amount}</p>
          </div>
        </div>

        <div className="add-controls mt-4 flex gap-2 items-center w-full">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Item</option>
            {products?.map((product) => (
              <option key={product?.id} value={product?.id}>
                {product?.name} |  ( {product?.stock} )
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

          <button
            className="bg-blue-600 text-white px-3 py-2 rounded"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
