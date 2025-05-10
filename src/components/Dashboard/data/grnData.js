import { getGRNs } from "../../../API/APIGRN";

const getGRNData = async () => {
  try {
    const response = await getGRNs();
    return response;
  } catch (error) {
    console.error("Error fetching GRN data:", error);
    return [];
  }
};

export { getGRNData };
