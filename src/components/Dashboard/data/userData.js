
import { getUsers } from "../../../API/APIUser";

const getUserData = async ( ) => {

  try {

    const response = await getUsers();
    return response;

  } 
  catch ( error ) {
    
    console.error ( "Error fetching user data:" , error );
    return [ ];

  }

};

export { getUserData };
