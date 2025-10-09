
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";

// function App() {
//   return (
//     <BrowserRouter>
//       <FDPAttendedProvider>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/fdp-attended/*" element={<FDPAttendedForm />} />
//           <Route path="/fdp-conducted" element={<FDPConductedForm />} />
//           <Route path="/expert-talks" element={<ExpertTalkForm />} />
//           {/* TemplatePreview route */}
//           <Route path="/template-preview" element={<TemplatePreview />} />
//           {/* Download page route */}
//           <Route path="/download" element={<DownloadPage />} />
//         </Routes>
//       </FDPAttendedProvider>
//     </BrowserRouter>
//   );
// }

// export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";


// // Import Navbar
// import Navbar from "./components/Navbar"; // Update path if different

// function App() {
//   return (
//     <BrowserRouter>
//       <FDPAttendedProvider>
//         {/* Navbar added here so it shows on all pages */}
//         <Navbar />
        

//         <Routes>
//           <Route path="/" element={<Dashboard />} 
//           />
//           <Route path="/fdp-attended/*" element={<FDPAttendedForm />} />
//           <Route path="/fdp-conducted" element={<FDPConductedForm />} />
//           <Route path="/expert-talks" element={<ExpertTalkForm />} />
//           <Route path="/template-preview" element={<TemplatePreview />} />
//           <Route path="/download" element={<DownloadPage />} />
//         </Routes>
//       </FDPAttendedProvider>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
import TemplatePreview from "./components/TemplatePreview";
import DownloadPage from "./pages/Download/DownloadPage";
import { FDPAttendedProvider } from "./context/FDPAttendedContext";

import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";

function App() {
  const sidebarWidth = 260; // must match Sidebar width

  return (
    <BrowserRouter>
      <FDPAttendedProvider>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            ml: `${sidebarWidth}px`, // leave space for fixed sidebar
            p: 3,
            bgcolor: "#f5f5f5",
            minHeight: "100vh",
            transition: "margin-left 0.3s",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fdp-attended/*" element={<FDPAttendedForm />} />
            <Route path="/fdp-conducted" element={<FDPConductedForm />} />
            <Route path="/expert-talks" element={<ExpertTalkForm />} />
            <Route path="/template-preview" element={<TemplatePreview />} />
            <Route path="/download" element={<DownloadPage />} />
          </Routes>
        </Box>
      </FDPAttendedProvider>
    </BrowserRouter>
  );
}

export default App;


