
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
//           <Route path="/fdp-attended/template-preview" element={<TemplatePreview />} />
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

function App() {
  return (
    <BrowserRouter>
      <FDPAttendedProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fdp-attended/*" element={<FDPAttendedForm />} />
          <Route path="/fdp-conducted" element={<FDPConductedForm />} />
          <Route path="/expert-talks" element={<ExpertTalkForm />} />
          {/* TemplatePreview route */}
          <Route path="/fdp-attended/template-preview" element={<TemplatePreview />} />
          {/* Download page route */}
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </FDPAttendedProvider>
    </BrowserRouter>
  );
}

export default App;
