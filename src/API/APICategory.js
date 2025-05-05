import axios from "axios";
import APILinks from "./APILinks";

const getCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getCategories, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error.response?.data || error.message
    );
  }
};
const getCategoryById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getCategoryById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category:",
      error.response?.data || error.message
    );
  }
};
const saveCategory = async (category) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(APILinks.saveCategory, category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error saving category:",
      error.response?.data || error.message
    );
  }
};
const updateCategory = async (id, category) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(APILinks.updateCategory(id), category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message
    );
  }
};

export { getCategories, getCategoryById, saveCategory, updateCategory };
