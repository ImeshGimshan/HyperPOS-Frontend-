import axios from "axios";
import APILinks from "./APILinks";

const submitSale = async (cart) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve stored JWT token

    const response = await axios.post(APILinks.saveSale, cart, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token for authentication
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting sale:",
      error.response?.data || error.message
    );
  }
};
const returnSale = async (id, cart) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve stored JWT token

    const response = await axios.put(APILinks.returnSale(id), cart, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token for authentication
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error updating sale:",
      error.response?.data || error.message
    );
  }
};
const getSale = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve stored JWT token
    const response = await axios.get(APILinks.getSales, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sales:",
      error.response?.data || error.message
    );
  }
};

const getSaleById = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve stored JWT token
    const response = await axios.get(APILinks.getSaleById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sale:",
      error.response?.data || error.message
    );
  }
};

export { submitSale, returnSale, getSale, getSaleById };
