import axios from "axios";
const API = "http://localhost:5001/api/expert-talks";

export const createExpertTalk = (data) => axios.post(API, data);
export const getAllExpertTalks = () => axios.get(API);
