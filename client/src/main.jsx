

//client/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },      // Navbar primary color
    secondary: { main: "#f50057" },    // Profile button
    error: { main: "#d32f2f" },        // Logout button
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);



