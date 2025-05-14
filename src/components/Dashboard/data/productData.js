  import { getProducts, getProductImage } from "../../../API/APIProducts";

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

const getProductImageUrl = async (productId) => {
  try {
    const imageUrl = await getProductImage(productId);
    return imageUrl;
  }
  catch (error) {
    console.error("Error fetching product image:", error);
    return null;
  }
};

export { getProductData, getProductImageUrl };
