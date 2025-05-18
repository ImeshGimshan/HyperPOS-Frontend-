import React, { useState, useRef, useEffect } from "react";
import {
  saveProduct,
  saveProductImage,
  updateProduct,
  getProducts,
} from "../../API/APIProducts";
import { getCategories } from "../../API/APICategory";
import { FiCamera } from "react-icons/fi";
import { BiBarcode } from "react-icons/bi";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const unitList = [
    "KG", "GRAM", "MILLIGRAM", "LITRE", "MILLILITRE", "PIECE", "PACKET", "BAG", "BOX", "BOTTLE", "CAN", "BUNCH", "METER", "ROLL", "SET", "PAIR", "DOZEN", "CARTON", "SHEET", "TON", "GALLON", "BARREL", "CUBIC_METER", "YARD", "FOOT", "INCH", "SLAB", "REEL", "LOAF", "TUBE", "SACHET",
  ];

  const [form, setForm] = useState({
    id: undefined,
    barcode: "",
    name: "",
    unit: "",
    price: "",
    categoryId: "",
    discount: 0,
    description: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const barcodeRef = useRef(null);

  useEffect(() => {
    getCategoriesData();
    getAllProducts();
  }, []);

  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      alert(error.response?.data?.message || error?.message);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      alert(error.response?.data?.message || error?.message);
    }
  };

  const setProductToUpdate = (e) => {
    if (e.target.value === "New Product") {
      setForm({
        id: undefined,
        barcode: "",
        name: "",
        unit: "",
        price: "",
        categoryId: "",
        discount: 0,
        description: "",
        photo: null,
      });
      setIsUpdate(false);
      return;
    }
    const product = products.find((p) => p.id == e.target.value);
    setForm({
      id: product.id,
      barcode: product.barcode,
      name: product.name,
      unit: product.unit,
      price: product.price,
      categoryId: product.categoryId,
      discount: product.discount,
      description: product.description,
      photo: null,
    });
    setIsUpdate(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.barcode.trim()) newErrors.barcode = "Barcode is required.";
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.unit) newErrors.unit = "Unit must be selected.";
    if (!form.price || isNaN(form.price)) newErrors.price = "Valid price is required.";
    if (!form.categoryId) newErrors.categoryId = "Please select a category.";
    if (form.discount < 0) newErrors.discount = "Discount cannot be negative.";
    if (form.discount > 100) newErrors.discount = "Discount cannot be more than 100%.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    submitForm();
  };

  const submitForm = async () => {
    setIsLoading(true);
    let pid = null;
    let image = form?.photo;
    if (isUpdate) {
      try {
        const response = await updateProduct(form?.id, form);
        pid = response?.id;
        alert("Product updated successfully!");
        getAllProducts();
      } catch (error) {
        alert(error.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
      return;
    } else {
      try {
        const response = await saveProduct(form);
        pid = response?.id;
        alert("Product added successfully!");
        barcodeRef.current.value = "";
        setForm({
          id: undefined,
          barcode: "",
          name: "",
          unit: "",
          price: "",
          categoryId: "",
          discount: 0,
          description: "",
          photo: null,
        });
        getAllProducts();
      } catch (error) {
        alert(error.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
    }
    // Handle image upload after adding product
    if (pid && image) {
      try {
        await saveProductImage(pid, image);
        alert("Image saved successfully");
      } catch (error) {
        alert(error.response?.data?.message || error?.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-6 sm:px-6 md:px-8">
      {/* Add background effect, particles or scanlines if you like */}
      <div className="absolute inset-0 hyper-bg -z-10"></div>

      <div className="relative w-full max-w-sm md:max-w-2xl mx-auto z-10">
        <div className="relative bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold hyper-text-glow text-white mb-1 sm:mb-2">
              {isUpdate ? "UPDATE" : "ADD"} <span className="text-[#f472b6]">PRODUCT</span>
            </h2>
            <p className="text-purple-300/70 text-xs tracking-wider">
              Fill the product details below
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Select */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                SELECT PRODUCT (For update)
              </label>
              <select
                name="id"
                value={form.id || "New Product"}
                onChange={setProductToUpdate}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
              >
                <option value="New Product">New Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Barcode */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                BARCODE
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="barcode"
                  placeholder="Scan Barcode"
                  ref={barcodeRef}
                  value={form.barcode}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className="w-full px-10 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] transition-all"
                />
                <BiBarcode
                  className="absolute left-3 top-3 text-xl text-purple-400 cursor-pointer"
                  onClick={() => barcodeRef.current?.focus()}
                />
                <span
                  className="absolute right-3 top-2.5 text-xs bg-[#f472b6] px-3 py-1 rounded-full text-white cursor-pointer hover:bg-pink-600"
                  onClick={() => barcodeRef.current?.focus()}
                >
                  Scan
                </span>
              </div>
              {errors.barcode && (
                <p className="hyper-warning-text text-xs mt-1">{errors.barcode}</p>
              )}
            </div>
            {/* Name & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  PRODUCT NAME
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] transition-all"
                />
                {errors.name && (
                  <p className="hyper-warning-text text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  UNIT
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
                >
                  <option value="">Select unit</option>
                  {unitList.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="hyper-warning-text text-xs mt-1">{errors.unit}</p>
                )}
              </div>
            </div>
            {/* Price & Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  PRICE
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] transition-all"
                />
                {errors.price && (
                  <p className="hyper-warning-text text-xs mt-1">{errors.price}</p>
                )}
              </div>
              <div>
                <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  DISCOUNT (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  placeholder="Enter discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] transition-all"
                />
                {errors.discount && (
                  <p className="hyper-warning-text text-xs mt-1">{errors.discount}</p>
                )}
              </div>
            </div>
            {/* Category */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                CATEGORY
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
              >
                <option value="">Choose the Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="hyper-warning-text text-xs mt-1">{errors.categoryId}</p>
              )}
            </div>
            {/* Description */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                DESCRIPTION
              </label>
              <textarea
                name="description"
                placeholder="Enter Description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-[#f472b6] transition-all"
              ></textarea>
              {errors.description && (
                <p className="hyper-warning-text text-xs mt-1">{errors.description}</p>
              )}
            </div>
            {/* Image Upload & Preview */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center gap-3 px-4 py-3 bg-[#3a2a55] text-purple-200 rounded-lg cursor-pointer hover:bg-[#4b3b6e] transition"
                >
                  <FiCamera className="text-xl" />
                  <span>{form.photo ? form.photo.name : "Choose Picture"}</span>
                  <input
                    id="photo-upload"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {errors.photo && (
                  <p className="hyper-warning-text text-xs mt-1">{errors.photo}</p>
                )}
              </div>
              {/* Image Preview */}
              {form.photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(form.photo)}
                    alt="Preview"
                    className="w-32 h-32 object-cover mx-auto rounded-lg border border-[#f472b6] shadow-md"
                  />
                </div>
              )}
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="hyper-button w-full py-2.5 text-white uppercase tracking-wider text-sm font-medium relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="inline w-4 h-4 mr-2 text-gray-200 animate-spin fill-[#f472b6]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span>{isUpdate ? "Updating..." : "Saving..."}</span>
                    </>
                  ) : (
                    isUpdate ? "Update Product" : "Add Product"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
