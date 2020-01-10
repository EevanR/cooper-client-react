import axios from "axios";

const logout = async () => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };
  let response = await axios.delete("/auth/sign_out", {
      headers: headers
    }
  );
  if (response.data.success) {
    return {authenticated: false}
  } else { 
    return {message: response.data.errors[0]}
  }
};

export { logout }