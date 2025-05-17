
import { getOrgInfo , updateOrgInfo } from "../../../API/APIOrg";

const getOrgData = async ( ) => {

    try {

      const response = await getOrgInfo();
      return response;

    } 
    catch ( error ) {

      console.error("Error fetching organization data:", error);
      return [];

    }

};

const updateOrgData = async ( orgData ) => {

  try {

    const response = await updateOrgInfo ( orgData );
    return response;

  }
  catch ( error ) {

    console.error("Error updating organization data:", error);
    throw error;

  }

}

export { getOrgData , updateOrgData };