import axios from "axios";
import APILinks from "./APILinks";

const getGRNs = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getGRNs, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getGRNById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getGRNById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const saveGRN = async (grn) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.saveGRN, grn, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const updateGRN = async (id, grn) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.updateGRN(id), grn, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const returnGRN = async (id, grnData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.returnGRN(id), grnData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getGRNs, getGRNById, saveGRN, updateGRN, returnGRN };