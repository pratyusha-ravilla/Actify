
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/fdp-attended";

export const getAllFDPAttended = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createFDPAttended = async (data) => {
  try {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const generateFDPReport = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/report/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};






