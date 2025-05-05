import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    barcode: '',
    productName: '',
    unit: '',
    price: '',
    category: '',
    description: '',
    photo: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData(prev => ({
        ...prev,
        photo: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', productData);
    // Submit logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-[#1C0E41] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Add New Product
            </h2>
            <p className="mt-2 text-gray-400">
              Fill in the product details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                required
                value={productData.productName}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Barcode */}
            <div>
              <label htmlFor="barcode" className="block text-sm font-medium text-gray-300 mb-1">
                Barcode *
              </label>
              <input
                type="text"
                name="barcode"
                id="barcode"
                required
                value={productData.barcode}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                id="category"
                required
                value={productData.category}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="home">Home & Garden</option>
                <option value="health">Health & Beauty</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Unit and Price - kept together as they're related */}
            <div className="grid grid-cols-2 gap-4">
              {/* Unit */}
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-300 mb-1">
                  Unit *
                </label>
                <select
                  name="unit"
                  id="unit"
                  required
                  value={productData.unit}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select unit</option>
                  <option value="piece">Piece</option>
                  <option value="kg">Kilogram</option>
                  <option value="g">Gram</option>
                  <option value="l">Liter</option>
                  <option value="ml">Milliliter</option>
                  <option value="box">Box</option>
                  <option value="pack">Pack</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                  Price *
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    step="0.01"
                    required
                    value={productData.price}
                    onChange={handleChange}
                    className="block w-full pl-7 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={productData.description}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Product details, features, etc."
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Product Photo
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="photo"
                  className="cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md shadow-sm py-2 px-4 text-white transition duration-150 ease-in-out"
                >
                  <span>Choose Photo</span>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <span className="ml-4 text-sm text-gray-400">
                  {productData.photo ? productData.photo.name : 'No file chosen'}
                </span>
              </div>
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Product preview"
                    className="h-32 w-32 object-cover rounded-md border border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;