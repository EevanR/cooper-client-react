import axios from "axios";
import { storeAuthCredentials } from "./auth"

const saveUser = async (email, password) => {
  try {
    const response = await axios.post("/auth", {
      email: email,
      password: password,
    });
    await storeAuthCredentials(response);
    return { authenticated: true };
  } catch (error) {
    return {authenticated: false, message: error.response.data.errors[0]};
  }
};

export { saveUser } 