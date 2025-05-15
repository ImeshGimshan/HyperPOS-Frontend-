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

  useEffect(() => {
    getCategoriesData();
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  };
  const setProductToUpdate = (e) => {
    if (e.target.value == "New Product") {
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
    console.log(e.target.value);
    const product = products.find((product) => product.id == e.target.value);
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

  const unit = [
    "KG",
    "GRAM",
    "MILLIGRAM",
    "LITRE",
    "MILLILITRE",
    "PIECE",
    "PACKET",
    "BAG",
    "BOX",
    "BOTTLE",
    "CAN",
    "BUNCH",
    "METER",
    "ROLL",
    "SET",
    "PAIR",
    "DOZEN",
    "CARTON",
    "SHEET",
    "TON",
    "GALLON",
    "BARREL",
    "CUBIC_METER",
    "YARD",
    "FOOT",
    "INCH",
    "SLAB",
    "REEL",
    "LOAF",
    "TUBE",
    "SACHET",
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
  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  };

  const [errors, setErrors] = useState({});
  const barcodeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    console.log(form);
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.barcode.trim()) newErrors.barcode = "Barcode is required.";
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.unit) newErrors.unit = "unit must be selected.";
    if (!form.price || isNaN(form.price))
      newErrors.price = "Valid price is required.";
    if (!form.categoryId) newErrors.categoryId = "Please select a categoryId.";
    if (form.discount < 0) newErrors.discount = "Discount cannot be negative.";
    if (form.discount > 100)
      newErrors.discount = "Discount cannot be more than 100%.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", form);
    // Submit the form
    submitForm();
  };
  const submitForm = async () => {
    let pid = null;
    let image = form?.photo;
    if (isUpdate) {
      try {
        const response = await updateProduct(form?.id, form);
        pid = response?.id;
        alert("Product updated successfully!");
        getAllProducts();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
      return;
    } else {
      try {
        const response = await saveProduct(form);
        pid = response?.id;
        alert("Product added successfully!");
        barcodeRef.current.value = "";
        setForm({
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
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
    }
    if (pid && image) {
      try {
        const response = await saveProductImage(pid, image);
        alert("Image saved successfully");
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
    }
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1c1233] text-white p-4 rounded-3xl w-full max-w-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 border-b border-gray-600 pb-2">
          Add / Update Product
        </h2>

        {/* products */}
        <div className="mb-2">
          <label className="block mb-1 text-sm">
            Select Product for update
          </label>
          <select
            name="id"
            value={form.id}
            onChange={(e) => setProductToUpdate(e)}
            className="w-full px-4 py-2 rounded-lg bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="New Product">New Product</option>
            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
                onClick={() => console.log("hi")}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>
        {/* Barcode */}
        <div className="mb-2">
          <label className="block mb-1 text-sm">Barcode</label>
          <div className="relative">
            <input
              type="text"
              name="barcode"
              placeholder="Scan Barcode"
              ref={barcodeRef}
              value={form.barcode}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="w-full px-12 py-2 rounded-lg bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <BiBarcode
              className="absolute left-3 top-2.5 text-gray-300 text-xl cursor-pointer hover:text-purple-400"
              onClick={() => barcodeRef.current?.focus()}
            />

            <span
              className="absolute right-3 top-1.5 text-sm bg-purple-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-purple-600"
              onClick={() => barcodeRef.current?.focus()}
            >
              Scan
            </span>
          </div>

          {errors.barcode && (
            <p className="text-red-400 text-sm mt-1">{errors.barcode}</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">

        {/* Product Name */}
        <div className="mb-2 w-full">
          <label className="block mb-1 text-sm">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* unit */}
        <div className="mb-2 w-3/6">
          <label className="block mb-1 text-sm">unit</label>
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#3a2a55] text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select unit</option>
            {unit.map((unit) => (
              <option key={unit} value={unit}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </option>
            ))}
          </select>

          {errors.unit && (
            <p className="text-red-400 text-sm mt-1">{errors.unit}</p>
          )}
        </div></div>
        <div className="flex gap-2 justify-between">
          {/* Price */}
          <div className="mb-2 w-full">
            <label className="block mb-1 text-sm">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* discount */}
          <div className="mb-2 w-3/6">
            <label className="block mb-1 text-sm">Discount</label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>
        </div>

        {/* CategoryId */}
        <div className="mb-2">
          <label className="block mb-1 text-sm">Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#3a2a55] text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Choose the Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-red-400 text-sm mt-1">{errors.categoryId}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div className="flex gap-2 justify-evenly">
          {/* Add Photo */}
          <div className="mb-4">
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center gap-3 px-4 py-3 bg-[#3a2a55] text-gray-300 rounded-lg cursor-pointer hover:bg-[#4b3b6e] transition"
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
              <p className="text-red-400 text-sm mt-1">{errors.photo}</p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition mt-2"
            >
              Submit Product
            </button>
          </div>

          {/* Image */}
          {form.photo && (
            <div className="mb-6 text-center">
              <img
                src={URL.createObjectURL(form.photo)}
                alt="Preview"
                className="w-32 h-32 object-cover mx-auto rounded-lg border border-purple-500 shadow-md"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
