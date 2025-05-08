import axios from "axios";
import APILinks from "./APILinks";
const getPurchases = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getPurchases, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//have to implement this function in the backend
const getPurchaseById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getPurchaseById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const savePurchase = async (purchase) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.savePurchase, purchase, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const returnPurchase = async (id, purchase) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.returnPurchase(id), purchase, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export { getPurchases, getPurchaseById, savePurchase, returnPurchase };