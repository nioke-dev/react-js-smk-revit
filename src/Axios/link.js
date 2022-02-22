import axios from "axios";

const url = "http://localhost:8000/api";
let token = "mV4j2ELsPiygF51331TPjAkfKWSm7HejfhTgnruX";

export const link = axios.create({
  baseURL: url,
  headers: {
    api_token: token,
  },
});
