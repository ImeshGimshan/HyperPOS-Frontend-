
import { getProducts } from "../../../API/APIProducts";

const getProductData = async ( ) => {

  try {

    const response = await getProducts();
    return response;

  } 
  catch ( error ) {
    
    console.error ( "Error fetching product data:" , error );
    return [ ];

  }

};

export { getProductData };
