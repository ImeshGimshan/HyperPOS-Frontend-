import axios from "axios";
import APILinks from "./APILinks";

const getGRNs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getGRNs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching GRNs:",
      error.response?.data || error.message
    );
  }
};
const getGRNById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getGRNById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GRN:", error.response?.data || error.message);
  }
};
const saveGRN = async (grn) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(APILinks.saveGRN, grn, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving GRN:", error.response?.data || error.message);
  }
};
const updateGRN = async (id, grn) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(APILinks.updateGRN(id), grn, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating GRN:", error.response?.data || error.message);
  }
};

export { getGRNs, getGRNById, saveGRN, updateGRN };
