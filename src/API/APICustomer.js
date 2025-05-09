import axios from "axios";
import APILinks from "./APILinks";

const getCustomers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getCustomers, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getCustomerById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getCustomerById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const saveCustomer = async (customer) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.saveCustomer, customer, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateCustomer = async (id, customer) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.updateCustomer(id), customer, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getCustomers, getCustomerById, saveCustomer, updateCustomer };