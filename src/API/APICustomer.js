import axios from "axios";
import APILinks from "./APILinks";

const getCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getCustomers, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching customers:",
      error.response?.data || error.message
    );
  }
};
const getCustomerById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getCustomerById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching customer:",
      error.response?.data || error.message
    );
  }
};
const saveCustomer = async (customer) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(APILinks.saveCustomer, customer, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error saving customer:",
      error.response?.data || error.message
    );
  }
};
const updateCustomer = async (id, customer) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(APILinks.updateCustomer(id), customer, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating customer:",
      error.response?.data || error.message
    );
  }
};

export { getCustomers, getCustomerById, saveCustomer, updateCustomer };
