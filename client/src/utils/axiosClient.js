
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






// import axios from "axios";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://actify-server.onrender.com/api";

// const axiosClient = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
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

/*
  Determine API URL safely
  1) If running locally → use localhost backend
  2) If running on production domain → use Render backend
*/

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5002/api"
    : "https://actify-server.onrender.com/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
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