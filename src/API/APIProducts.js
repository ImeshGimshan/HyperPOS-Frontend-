import axios from "axios";
import APILinks from "./APILinks";

const getProducts = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getProducts, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(APILinks.getProductById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const saveProduct = async (product) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.saveProduct, product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateProduct = async (id, product) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.updateProduct(id), product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getProductStock = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getProductStock, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getProductStockById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getProductStockById(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  getProductStock,
  getProductStockById,
};