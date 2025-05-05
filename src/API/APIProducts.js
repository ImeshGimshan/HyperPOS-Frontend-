import axios from "axios";
import APILinks from "./APILinks";

const getProducts = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve stored JWT token
    const response = await axios.get(APILinks.getProducts, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
  }
};
const getProductById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getProductById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message
    );
  }
};
const saveProduct = async (product) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(APILinks.saveProduct, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error saving product:",
      error.response?.data || error.message
    );
  }
};

const updateProduct = async (id, product) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(APILinks.updateProduct(id), product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
  }
};
const getProductStock = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getProductStock, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product stock:",
      error.response?.data || error.message
    );
  }
};
const getProductStockById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getProductStockById(id), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product stock:",
      error.response?.data || error.message
    );
  }
};

export {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  getProductStock,
  getProductStockById,
};
