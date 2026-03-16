
// //client/src/utils/axiosClient.js
// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "https://actify-server.onrender.com/api",
// });

// axiosClient.interceptors.request.use((config) => {
//   const user = localStorage.getItem("actirepo_user");
//   if (user) {
//     const token = JSON.parse(user).token;
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosClient;




import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://actify-server.onrender.com/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const user = localStorage.getItem("actirepo_user");

  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;



