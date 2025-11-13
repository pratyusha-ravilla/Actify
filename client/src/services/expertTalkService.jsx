
//client/src/services/expertTalkServices.jsx

import axios from "axios";

const API_URL = "http://localhost:5001/api/expert-talks";

export const createExpertTalk = async (data) => {
  return axios.post(API_URL, data);
};

export const getExpertTalks = async () => {
  return axios.get(API_URL);
};

