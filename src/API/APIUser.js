
import axios from "axios";

import APILinks from "./APILinks";

const getUsers = async ( ) => {

  try {

    const token = localStorage.getItem ( "token" );
    const response = await axios.get ( APILinks.getUser , {

      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${ token }`,
      },

    } );
    return response.data;
  } 
  catch ( error ) {

    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );

  }

};

const getUserById = async ( id ) => {

  try {

    const token = localStorage.getItem ( "token" );
    const response = await axios.get ( APILinks.getUserById ( id ) , {

      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${ token }`,
      },

    } );
    return response.data;
  } 
  catch ( error ) {

    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    
  }

};

export { getUsers , getUserById };