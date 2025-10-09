
// client/src/services/fdpAttendedService.js


import axios from "axios";

const API_URL = "http://localhost:5001/api/fdp-attended"; // ✅ Ensure port matches your backend

// Create FDP Attended record
export const createFDPAttended = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating FDP Attended:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all FDP Attended records
export const getFDPAttended = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

