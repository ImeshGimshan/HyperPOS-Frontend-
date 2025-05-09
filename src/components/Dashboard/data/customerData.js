
import { getCustomers } from "../../../API/APICustomer";

const getCustomerData = async ( ) => {

  try {

    const response = await getCustomers();
    return response;

  } 
  catch ( error ) {

    console.error("Error fetching customer data:", error);
    return [];

  }

};

export { getCustomerData };
