
import {

  submitSale,
  returnSale,
  getSale,
  getSaleById,
  
} from "../../API/APISale";

import {

  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  getProductStock,
  getProductStockById,
} from "../../API/APIProducts";

import { cart , updateCart , product , updatedProduct } from "./postData";
import testLogin from "../../API/testLogin";

function Test ( ) 
{
  const btnStyle =
    "bg-amber-300 p-1 m-1 font-bold w-[30%] border-black border-2 rounded-lg pointer hover:bg-amber-400 hover:scale-105 transition-all duration-300 ease-in-out";

  // Sale API calls
  const handleSubmit = async ( ) => {
    try {
      const response = await submitSale ( cart );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleUpdate = async ( ) => {
    try {
      const response = await returnSale ( updateCart.invoice.id , updateCart );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleGetAll = async ( ) => {
    try {
      const response = await getSale ( );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleGetById = async ( ) => {
    try {
      const response = await getSaleById ( 1 );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  // Product API calls
  const handleGetAllProducts = async ( ) => {
    try {
      const response = await getProducts ( );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleGetProductById = async ( ) => {
    try {
      const response = await getProductById ( 1 );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleSaveProduct = async ( ) => {
    try {
      const response = await saveProduct ( product );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleUpdateProduct = async ( ) => {
    try {
      const response = await updateProduct ( updatedProduct.id , updatedProduct );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleGetProductStock = async ( ) => {
    try {
      const response = await getProductStock ( );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleGetProductStockById = async ( ) => {
    try {
      const response = await getProductStockById ( 1 );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  };

  const handleLogin = async ( ) => {
    try {
      const response = await testLogin ( "Admin" , "admin" );
      console.log ( "Response:" , response );
    } catch ( error ) {
      console.error ( "Error:" , error );
    }
  }

  return (

    <div>

      <h1>Test sales</h1>
      <button onClick = { ( ) => handleSubmit ( ) } className = { btnStyle }>
        submit invoice
      </button>
      <button onClick = { ( ) => handleUpdate ( ) } className = { btnStyle }>
        update invoice
      </button>
      <button onClick = { ( ) => handleGetAll ( ) } className = { btnStyle }>
        get all invoice
      </button>
      <button onClick = { ( ) => handleGetById ( ) } className = { btnStyle }>
        get invoice by id
      </button>

      <h1>Test product</h1>
      <button onClick = { ( ) => handleGetAllProducts ( ) } className = { btnStyle }>
        GetAllProducts
      </button>
      <button onClick = { ( ) => handleGetProductById ( ) } className = { btnStyle }>
        GetProductById
      </button>
      <button onClick = { ( ) => handleGetProductStock ( ) } className = { btnStyle }>
        GetProductStock
      </button>
      <button onClick = { ( ) => handleGetProductStockById ( ) } className = { btnStyle }>
        GetProductStockById
      </button>
      <button onClick = { ( ) => handleSaveProduct ( ) } className = { btnStyle }>
        SaveProduct
      </button>
      <button onClick = { ( ) => handleUpdateProduct ( ) } className = { btnStyle }>
        UpdateProduct
      </button>
      <button onClick = { ( ) => handleLogin( ) } className = { btnStyle }>
        Login here
      </button>

    </div>

  );

}

export default Test;
