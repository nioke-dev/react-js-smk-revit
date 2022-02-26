import axios from "axios";

const url = "http://localhost:8000/api";
// let token = sessionStorage.getItem("token");
// console.log(token);

export const link = axios.create({
  baseURL: url,
  headers: {
    api_token: sessionStorage.getItem("token"),
  },
});
