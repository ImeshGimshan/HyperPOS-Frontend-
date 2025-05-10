
import { getSale } from "../../../API/APISale";

const getSaleData = async ( ) => {

  try {

    const response = await getSale();
    return response;

  } 
  catch ( error ) {

    console.error("Error fetching sale data:", error);
    return [];

  }

};

export { getSaleData };