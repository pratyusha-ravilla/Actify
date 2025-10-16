
// client/src/services/fdpAttendedService.js


// import axios from "axios";

// const API_URL = "http://localhost:5001/api/fdp-attended"; // ✅ Ensure port matches your backend

// // Create FDP Attended record
// export const createFDPAttended = async (data) => {
//   try {
//     const response = await axios.post(API_URL, data, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error creating FDP Attended:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Fetch all FDP Attended records
// export const getFDPAttended = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };







// client/src/services/fdpAttendedService.js
import axios from "axios";

// ✅ Make sure this matches your backend port
const API_BASE = "http://localhost:5001/api/fdp-attended";

// ✅ Create FDP Attended record
export const createFDPAttended = async (fdpData) => {
  try {
    console.log("📤 Sending FDP data to backend:", fdpData);

    const response = await axios.post(API_BASE, fdpData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ FDP Attended created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error creating FDP Attended:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Fetch all FDP Attended records
export const getAllFDPAttended = async () => {
  try {
    const response = await axios.get(API_BASE);
    console.log("📥 Retrieved FDP Attended records:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching FDP Attended records:",
      error.response?.data || error.message
    );
    throw error;
  }
};
