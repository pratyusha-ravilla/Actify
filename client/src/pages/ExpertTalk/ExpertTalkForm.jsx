import { useState } from "react";
import FormNavigation from "../../components/FormNavigation";
import Summary from "./Summary";
import TOC from "./TOC";
import UploadBrochure from "./UploadBrochure";
import ResourcePerson from "./ResourcePerson";
import GeoTagPhotos from "./GeoTagPhotos";
import Attendance from "./Attendance";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";

export default function ExpertTalkForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    toc: "",
    brochure: "",
    resourcePersons: [],
    geoTagPhotos: [],
    attendanceFile: "",
    feedback: {},
  });

  const navigate = useNavigate();

  const steps = [
    <Summary formData={formData} setFormData={setFormData} />,
    <TOC formData={formData} setFormData={setFormData} />,
    <UploadBrochure formData={formData} setFormData={setFormData} />,
    <ResourcePerson formData={formData} setFormData={setFormData} />,
    <GeoTagPhotos formData={formData} setFormData={setFormData} />,
    <Attendance formData={formData} setFormData={setFormData} />,
    <Feedback formData={formData} setFormData={setFormData} />,
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Submitting Expert Talk:", formData);
    navigate("/template-preview", { state: { data: formData } });
  };

  return (
    <div>
      <h2>Expert Talk Form</h2>
      {steps[step]}
      <FormNavigation
        step={step}
        total={steps.length}
        nextStep={nextStep}
        prevStep={prevStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
}





// // src/pages/ExpertTalk/ExpertTalkForm.jsx
// import React, { useState } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";

// import Summary from "./Summary";
// import TOC from "./TOC";
// import UploadBrochure from "./UploadBrochure";
// import ResourcePerson from "./ResourcePerson";
// import GeoTagPhotos from "./GeoTagPhotos";
// import Attendance from "./Attendance";
// import Feedback from "./Feedback";
// import FormNavigation from "../../components/FormNavigation";

// import { createExpertTalk } from "../../services/expertTalkService";

// export default function ExpertTalkForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     summary: "",
//     toc: "",
//     brochure: "",
//     resourcePersons: [],
//     geoTagPhotos: [],
//     attendanceFile: "",
//     feedback: {},
//     createdBy: "faculty",
//   });

//   const updateFormData = (section, data) => {
//     setFormData({ ...formData, [section]: data });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await createExpertTalk(formData);
//       navigate("/template-preview", { state: { data: res.data } });
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting Expert Talk form");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto" }}>
//       <h1>Expert Talk Form</h1>
//       <Routes>
//         <Route path="/" element={<Summary data={formData} update={updateFormData} next="/expert-talks/toc" />} />
//         <Route path="/toc" element={<TOC data={formData} update={updateFormData} prev="/" next="/expert-talks/upload-brochure" />} />
//         <Route path="/upload-brochure" element={<UploadBrochure data={formData} update={updateFormData} prev="/expert-talks/toc" next="/expert-talks/resource-person" />} />
//         <Route path="/resource-person" element={<ResourcePerson data={formData} update={updateFormData} prev="/expert-talks/upload-brochure" next="/expert-talks/geo-tag-photos" />} />
//         <Route path="/geo-tag-photos" element={<GeoTagPhotos data={formData} update={updateFormData} prev="/expert-talks/resource-person" next="/expert-talks/attendance" />} />
//         <Route path="/attendance" element={<Attendance data={formData} update={updateFormData} prev="/expert-talks/geo-tag-photos" next="/expert-talks/feedback" />} />
//         <Route path="/feedback" element={<Feedback data={formData} update={updateFormData} prev="/expert-talks/attendance" onSubmit={handleSubmit} />} />
//       </Routes>
//     </div>
//   );
// }
