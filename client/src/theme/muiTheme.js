// client/src/theme/muiTheme.js
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#4c1d95", // primary purple
//       contrastText: "#fff",
//     },
//     secondary: {
//       main: "#7c3aed", // secondary
//       contrastText: "#fff",
//     },
//     error: { main: "#e53935" },
//     background: {
//       default: "#f6f8fb",
//       paper: "#fff",
//     },
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h4: { fontWeight: 800 },
//     h6: { fontWeight: 700 },
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 14,
//           boxShadow: "0 6px 18px rgba(20,20,40,0.06)",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: 10,
//         },
//         containedPrimary: {
//           boxShadow: "none",
//         },
//       },
//     },
//   },
// });

// export default theme;




import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB", // modern blue
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;