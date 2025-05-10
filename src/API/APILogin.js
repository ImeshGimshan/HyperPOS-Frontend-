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

export default APILogin;