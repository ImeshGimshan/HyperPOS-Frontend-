import axios from "axios";
import APILinks from "./APILinks";
const getPurchases = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getPurchases, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching purchases:",
      error.response?.data || error.message
    );
  }
};

//have to implement this function in the backend
const getPurchaseById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getPurchaseById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching purchase:",
      error.response?.data || error.message
    );
  }
};
const savePurchase = async (purchase) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(APILinks.savePurchase, purchase, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error saving purchase:",
      error.response?.data || error.message
    );
  }
};
const returnPurchase = async (id, purchase) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(APILinks.returnPurchase(id), purchase, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error returning purchase:",
      error.response?.data || error.message
    );
  }
};
export { getPurchases, getPurchaseById, savePurchase, returnPurchase };
