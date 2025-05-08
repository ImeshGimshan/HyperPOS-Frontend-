import axios from "axios";
import APILinks from "./APILinks";

const getInvoices = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getInvoices, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getInvoiceById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getInvoiceById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const saveInvoice = async (invoice) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.saveInvoice, invoice, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const updateInvoice = async (id, invoice) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.updateInvoice(id), invoice, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getInvoices, getInvoiceById, saveInvoice, updateInvoice };