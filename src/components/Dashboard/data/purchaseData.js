
import { getPurchases } from "../../../API/APIPurchase";

const getPurchaseData = async ( ) => {

  try {

    const response = await getPurchases ( );
    return response;

  } 
  catch ( error ) {

    console.error ( "Error fetching purchase data:", error );
    return [ ];

  }

};

export { getPurchaseData };