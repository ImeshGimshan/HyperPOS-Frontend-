import axios  from "axios";
import APILinks from "./APILinks";

const testLogin = async (username, password) => {
  try {
    const response = await axios.post(APILinks.login, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export default testLogin;