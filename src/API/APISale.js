import axios from "axios";
import APILinks from "./APILinks";

const submitSale = async (cart) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(APILinks.saveSale, cart, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const returnSale = async (id, cart) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(APILinks.returnSale(id), cart, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getSale = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getSales, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getSaleById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getSaleById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { submitSale, returnSale, getSale, getSaleById };
