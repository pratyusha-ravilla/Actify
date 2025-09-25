import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
import TemplatePreview from "./components/TemplatePreview";
import DownloadPage from "./pages/Download/DownloadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fdp-attended" element={<FDPAttendedForm />} />
        <Route path="/fdp-conducted" element={<FDPConductedForm />} />
        <Route path="/expert-talks" element={<ExpertTalkForm />} />
        <Route path="/template-preview" element={<TemplatePreview />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
