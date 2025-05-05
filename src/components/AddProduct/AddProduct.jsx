
import React, { useState , useRef } from "react";

import { FiCamera } from "react-icons/fi";
import { BiBarcode } from "react-icons/bi";

const AddProduct = ( ) => {

  const [ form , setForm ] = useState ( {

    barcode : "",
    name : "",
    units : "",
    price : "",
    category : "",
    description : "",
    photo : null,

  } );

  const [ errors , setErrors ] = useState ( { } );
  const barcodeRef = useRef ( null );

  const handleChange = ( e ) => {

    const { name , value , files } = e.target;

    if ( name === "photo" ) {

      setForm ( { ...form , photo : files [ 0 ] } );

    } 
    else {

      setForm ( { ...form , [ name ] : value } );

    }

    setErrors ( { ...errors , [ name ] : "" } );

  };

  const validate = ( ) => {

    const newErrors = { };
    if ( !form.barcode.trim ( ) ) newErrors.barcode = "Barcode is required.";
    if ( !form.name.trim ( ) ) newErrors.name = "Product name is required.";
    if ( !form.units ) newErrors.units = "Units must be selected.";
    if ( !form.price || isNaN ( form.price ) ) newErrors.price = "Valid price is required.";
    if ( !form.category ) newErrors.category = "Please select a category.";
    if ( !form.description.trim ( ) ) newErrors.description = "Description is required.";
    if ( !form.photo ) newErrors.photo = "Please upload a photo.";

    return newErrors;

  };

  const handleSubmit = ( e ) => {

    e.preventDefault ( );

    const validationErrors = validate ( );

    if ( Object.keys ( validationErrors ).length > 0 ) {

      setErrors ( validationErrors );

      return;

    }

    console.log ( "Submitted:" , form );
    alert ( "Product added successfully!" );

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0036] to-[#000828] px-4">

      <form
        onSubmit = { handleSubmit }
        className = "bg-[#1c1233] text-white p-8 rounded-3xl w-full max-w-xl shadow-lg"
      >

        <h2 className = "text-2xl font-semibold text-center mb-6 border-b border-gray-600 pb-2">Add Product</h2>

        {/* Barcode */}
        <div className = "mb-4">

          <label className = "block mb-1 text-sm">Barcode</label>
          <div className = "relative">

            <input
              type = "text"
              name = "barcode"
              placeholder = "Scan Barcode"
              ref = { barcodeRef }
              value = { form.barcode }
              onChange = { handleChange }
              onKeyDown = { ( e ) => {
                if ( e.key === "Enter" ) {
                  e.preventDefault ( );
                }
              }}
              className = "w-full px-12 py-2 rounded-lg bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <BiBarcode
              className = "absolute left-3 top-2.5 text-gray-300 text-xl cursor-pointer hover:text-purple-400"
              onClick = { ( ) => barcodeRef.current?.focus ( ) }
            />

            <span
              className = "absolute right-3 top-1.5 text-sm bg-purple-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-purple-600"
              onClick = { ( ) => barcodeRef.current?.focus ( ) }
            >
              Scan
            </span>

          </div>

          { errors.barcode && <p className = "text-red-400 text-sm mt-1">{ errors.barcode }</p>}

        </div>

        {/* Product Name */}
        <div className = "mb-4">

          <label className = "block mb-1 text-sm">Product Name</label>
          <input
            type = "text"
            name = "name"
            placeholder = "Enter Product Name"
            value = { form.name }
            onChange = { handleChange }
            className = "w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {errors.name && <p className = "text-red-400 text-sm mt-1">{ errors.name }</p>}

        </div>

        {/* Units */}
        <div className = "mb-4">

          <label className = "block mb-1 text-sm">Units</label>
          <select
            name = "units"
            value = { form.units }
            onChange = { handleChange } 
            className = "w-full px-4 py-2 rounded-md bg-[#3a2a55] text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value = "">Select Units</option>
            <option value = "pcs">Pieces</option>
            <option value = "kg">Kilograms</option>
            <option value = "ltr">Liters</option>
          </select>

          {errors.units && <p className = "text-red-400 text-sm mt-1">{ errors.units }</p>}

        </div>

        {/* Price */}
        <div className = "mb-4">

          <label className = "block mb-1 text-sm">Price</label>
          <input
            type = "number"
            name = "price"
            placeholder = "Enter Price"
            value = { form.price }
            onChange = { handleChange }
            className = "w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {errors.price && <p className = "text-red-400 text-sm mt-1">{ errors.price }</p>}

        </div>

        {/* Category */}
        <div className = "mb-4">

          <label className = "block mb-1 text-sm">Category</label>
          <select
            name = "category"
            value = { form.category }
            onChange = { handleChange }
            className = "w-full px-4 py-2 rounded-md bg-[#3a2a55] text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value = "">Choose the Category</option>
            <option value = "electronics">Electronics</option>
            <option value = "grocery">Grocery</option>
            <option value = "fashion">Fashion</option>
          </select>

          {errors.category && <p className = "text-red-400 text-sm mt-1">{ errors.category }</p>}

        </div>

        {/* Description */}
        <div className = "mb-4">

          <label className = "block mb-1 text-sm">Description</label>
          <textarea
            name = "description"
            placeholder = "Enter Description"
            value = { form.description }
            onChange = { handleChange }
            rows = { 3 }
            className = "w-full px-4 py-2 rounded-md bg-[#3a2a55] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          {errors.description && <p className = "text-red-400 text-sm mt-1">{ errors.description }</p>}

        </div>

        {/* Add Photo */}
        <div className = "mb-6">

          <label className = "block mb-2 text-sm">Add Photo</label>
          <label
            htmlFor = "photo-upload"
            className = "flex items-center justify-center gap-3 px-4 py-3 bg-[#3a2a55] text-gray-300 rounded-lg cursor-pointer hover:bg-[#4b3b6e] transition"
          >
            <FiCamera className = "text-xl" />
            <span>{ form.photo ? form.photo.name : "Choose Picture" }</span>
            <input
              id = "photo-upload"
              type = "file"
              name = "photo"
              accept = "image/*"
              onChange = { handleChange }
              className = "hidden"
            />
          </label>

          { errors.photo && <p className = "text-red-400 text-sm mt-1">{ errors.photo }</p>}

        </div>

        {/* Image */}
        { form.photo && (

          <div className = "mb-6 text-center">
            <img
              src = { URL.createObjectURL ( form.photo ) }
              alt = "Preview"
              className = "w-32 h-32 object-cover mx-auto rounded-lg border border-purple-500 shadow-md"
            />
          </div>

        ) }

        {/* Submit Button */}
        <button
          type = "submit"
          className = "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Add Product
        </button>

      </form>

    </div>

  );

};

export default AddProduct;
