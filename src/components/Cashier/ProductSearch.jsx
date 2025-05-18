import { useState, useEffect, useRef } from "react";
import { getProductStock } from "../../API/APIProducts";

const ProductSearch = ({ onAdd, invoice, setProductList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barcode, setBarcode] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const suggestionsRef = useRef(null);

  // Load all products on mount
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
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

  // Update suggestion list as searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = products?.filter((p) =>
        p?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, products]);

  // Update selected product from barcode
  useEffect(() => {
    if (barcode) {
      const found = products?.find((p) => p?.barcode === barcode.trim());
      if (found) {
        setSelectedProductId(found?.id.toString());
        setSearchTerm(found?.name);
      }
    }
    // eslint-disable-next-line
  }, [barcode]);

  // Get selected product details
  const selectedProduct = products?.find(
    (p) => p?.id === parseInt(selectedProductId)
  );
  const unit = selectedProduct?.unit || "";
  const price = selectedProduct?.price || 0;
  const discount = selectedProduct?.discount || 0;
  const stock = selectedProduct?.stock ?? "";
  const amount = (price * quantity * (1 - discount / 100)).toFixed(2);

  // Handle add product to cart
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
      setSuggestions([]);
    }
  };

  // Handle click outside suggestions to close list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-black/40 border border-[#f472b6]/20 rounded-2xl p-6 shadow-lg mt-6 mb-4">
      <div className="space-y-3 relative">
        {/* Name/Barcode Search */}
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="Search Item by Name..."
            value={searchTerm}
            autoComplete="off"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedProductId(""); // reset if typing new name
            }}
            className="border border-[#f472b6]/30 bg-[#0f0326]/80 text-white rounded-xl p-2 w-full focus:border-[#f472b6] shadow-inner transition placeholder-purple-300/70"
          />

          <input
            type="text"
            placeholder="Scan or Enter Barcode..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="border border-[#f472b6]/30 bg-[#0f0326]/80 text-white rounded-xl p-2 w-full focus:border-[#f472b6] shadow-inner transition placeholder-purple-300/70"
          />
        </div>

        {/* Suggestions dropdown */}
        {suggestions?.length > 0 && searchTerm && (
          <ul
            ref={suggestionsRef}
            className="absolute z-20 left-0 right-0 border border-[#f472b6]/30 bg-[#1c0e41] max-h-48 overflow-y-auto rounded-xl shadow-lg mt-1"
          >
            {suggestions?.map((product) => (
              <li
                key={product?.id}
                className="cursor-pointer hover:bg-[#f472b6]/40 px-3 py-2 flex justify-between text-white font-medium"
                onClick={() => {
                  setSelectedProductId(product?.id.toString());
                  setSearchTerm(product?.name);
                  setBarcode(product?.barcode);
                  setSuggestions([]);
                }}
              >
                <span>{product?.name}</span>
                <span className="text-xs text-purple-300">
                  | Stock: {product?.stock}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Product quick info */}
        <div className="mt-2 flex flex-col md:flex-row justify-between bg-[#1c0e41]/40 rounded-xl p-2 text-purple-200 text-sm font-semibold gap-2">
          <span>Unit: <span className="text-white">{unit}</span></span>
          <span>Price: <span className="text-white">Rs. {price?.toFixed(2)}</span></span>
          <span>Discount: <span className="text-white">{discount}%</span></span>
          <span>Stock: <span className="text-white">{stock}</span></span>
          <span>Total: <span className="text-[#f472b6] font-bold">Rs. {amount}</span></span>
        </div>

        {/* Select + Quantity + Add */}
        <div className="mt-2 flex flex-col md:flex-row gap-2 w-full">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="border border-[#f472b6]/30 bg-[#0f0326]/80 text-white rounded-xl p-2 w-full focus:border-[#f472b6] shadow-inner transition"
          >
            <option value="">Select Item</option>
            {products?.map((product) => (
              <option key={product?.id} value={product?.id}>
                {product?.name} | Stock: {product?.stock}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="border border-[#f472b6]/30 bg-[#0f0326]/80 text-white rounded-xl p-2 w-24 focus:border-[#f472b6] shadow-inner transition text-center"
          />

          <button
            className="bg-[#f472b6] text-white px-4 py-2 rounded-xl font-bold hover:bg-pink-700 shadow transition w-full md:w-40"
            onClick={handleAdd}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
