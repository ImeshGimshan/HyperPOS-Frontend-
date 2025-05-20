import axios from "axios";
import APILinks from "./APILinks";
const APILogin = async (username, password) => {
  const response = await axios.post(APILinks.login, {
    username,
    password,
  });
  
  localStorage.setItem("token", response.data.accessToken);
  const user = {
    id: response.data.user,
    username: response.data.username,
    email: response.data.email,
    roles: response.data.roles[0],
  };
  localStorage.setItem("user", JSON.stringify(user));
  return response.data;
};
const APILogout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  //alert("Logout successful");
  return true;
};

const APIGetUser = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getUser, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const APIGetUserById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(APILinks.getUserById(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const registerUser = async (user) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(APILinks.register, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};




const APIForgotPassword = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = localStorage.getItem("token");
  const response = await axios.put(APILinks.forgotPassword,{username,password}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};


export {
  APILogin,
  APILogout,
  APIGetUser,
  APIGetUserById,
  registerUser,
  setCookie,
  APIForgotPassword,
};

export default APILogin;