
//client/src/services/fdpConductedServices.jsx
import axios from "axios";

const API_URL = "http://localhost:5001/api/fdp-conducted";

export const createFDPConducted = async (data) => {
  return axios.post(API_URL, data);
};

export const getFDPConducted = async () => {
  return axios.get(API_URL);
};

