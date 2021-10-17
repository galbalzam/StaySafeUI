import axios from "axios";

export const login = async (username, password) => {
  await axios.post("http://localhost:3001/auth/login", { username, password });
};

export const register = async (
  username,
  password,
  firstName,
  lastName,
  phoneNumber
) => {
  await axios.post("http://localhost:3001/auth/register", {
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
  });
};
