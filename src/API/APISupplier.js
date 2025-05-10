import axios from "axios";
import { APILinks } from "../API/APILinks";

const getSuppliers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getSuppliers(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
return response.data;
};

const getSupplierById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getSupplierById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const saveSupplier = async (supplier) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.saveSupplier, supplier, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const updateSupplier = async (id, supplier) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.updateSupplier(id), supplier, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export { getSuppliers, getSupplierById, saveSupplier, updateSupplier };