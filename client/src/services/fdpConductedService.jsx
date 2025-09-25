import axios from "axios";
const API = "http://localhost:5001/api/fdp-conducted";

export const createFDPConducted = (data) => axios.post(API, data);
export const getAllFDPConducted = () => axios.get(API);
