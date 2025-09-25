import axios from "axios";
const API = "http://localhost:5001/api/fdp-attended";

export const createFDPAttended = (data) => axios.post(`${API}`, data);
export const getAllFDPAttended = () => axios.get(`${API}`);
