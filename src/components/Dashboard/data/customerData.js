import { getCustomers } from "../../../API/APICustomer";
import React, { useEffect, useState } from "react";

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
