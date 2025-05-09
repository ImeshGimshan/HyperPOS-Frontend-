
import { getInvoices } from "../../../API/APIInvoice";

const getInvoiceData = async ( ) => {

    try {

      const response = await getInvoices();
      return response;

    } 
    catch ( error ) {

      console.error("Error fetching invoice data:", error);
      return [];

    }

};

export { getInvoiceData };