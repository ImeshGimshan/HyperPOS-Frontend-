import axios  from "axios";
import APILinks from "./APILinks";

const APILogin = async (username, password) => {
    const response = await axios.post(APILinks.login, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    console.log("Login successful:", response.data);
    return response.data;

}
const APILogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout successful");
    return true;
}

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







export { APILogin, APILogout, APIGetUser, APIGetUserById, registerUser };

export default APILogin;