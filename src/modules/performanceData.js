import axios from "axios";

const saveData = async (result, distance, age, gender, entryHandler) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };
  try {
    await axios.post("/performance_data", 
      { 
        performance_data: { data: { 
          message: result,
          distance: distance,
          age: age,
          gender: gender
        } } 
      }, {
        headers: headers
      }
    );
    entryHandler();
  } catch (err) {
    alert("Something went wrong");
  }
};

const getData = async () => {
  let headers = await sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };
  const response = await axios.get("/performance_data", {
    headers: headers
    }
  );

  return response;
};

export { getData, saveData }