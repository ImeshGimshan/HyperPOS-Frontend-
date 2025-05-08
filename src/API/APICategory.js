import axios from "axios";
import APILinks from "./APILinks";

const getCategories = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getCategories, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getCategoryById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getCategoryById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const saveCategory = async (category) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.saveCategory, category, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateCategory = async (id, category) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.updateCategory(id), category, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getCategories, getCategoryById, saveCategory, updateCategory };