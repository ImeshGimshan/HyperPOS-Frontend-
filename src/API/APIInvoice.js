import axios from "axios";
import APILinks from "./APILinks";

const getInvoices = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getInvoices, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching invoices:",
      error.response?.data || error.message
    );
  }
};
const getInvoiceById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(APILinks.getInvoiceById(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching invoice:",
      error.response?.data || error.message
    );
  }
};
const saveInvoice = async (invoice) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(APILinks.saveInvoice, invoice, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error saving invoice:",
      error.response?.data || error.message
    );
  }
};
const updateInvoice = async (id, invoice) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(APILinks.updateInvoice(id), invoice, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating invoice:",
      error.response?.data || error.message
    );
  }
};

export { getInvoices, getInvoiceById, saveInvoice, updateInvoice };
