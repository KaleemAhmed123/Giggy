import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://giggy.netlify.app/api/",
  withCredentials: true,
});

export default newRequest;
