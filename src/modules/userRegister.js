import axios from "axios";

const saveUser = async (email, password) => {
  axios.post("/auth", {
      email: email,
      password: password
    }
  );
};

export { saveUser }