import axios from "axios";
import APILinks from "./APILinks";

const getProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    // console.log("Token:***************", token); // Log the token for debugging
    const response = await axios.get(APILinks.getProducts, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false, // PS : Changed to false for testing. Data wasn't getting fetched for policy reasons. ( Imesh , Menda )
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

const saveProductImage = async (id, image) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append('image', image);
  const response = await axios.post(APILinks.saveProductImage(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getProductImage = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getProductImage(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error(
      "Error fetching product image:",
      error.response?.data || error.message
    );
    return null;
  }
};

export {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  getProductStock,
  getProductStockById,
  saveProductImage,
  getProductImage,
};
