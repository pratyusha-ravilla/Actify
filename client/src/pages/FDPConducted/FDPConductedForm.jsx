// import { useState } from "react";
// import FormNavigation from "../../components/FormNavigation";
// import Summary from "./Summary";
// import TOC from "./TOC";
// import UploadBrochure from "./UploadBrochure";
// import ResourcePerson from "./ResourcePerson";
// import GeoTagPhotos from "./GeoTagPhotos";
// import Attendance from "./Attendance";
// import Feedback from "./Feedback";
// import { useNavigate } from "react-router-dom";

// export default function FDPConductedForm() {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({
//     title: "",
//     summary: "",
//     toc: "",
//     brochure: "",
//     resourcePersons: [],
//     geoTagPhotos: [],
//     attendanceFile: "",
//     feedback: {},
//   });

//   const navigate = useNavigate();

//   const steps = [
//     <Summary formData={formData} setFormData={setFormData} />,
//     <TOC formData={formData} setFormData={setFormData} />,
//     <UploadBrochure formData={formData} setFormData={setFormData} />,
//     <ResourcePerson formData={formData} setFormData={setFormData} />,
//     <GeoTagPhotos formData={formData} setFormData={setFormData} />,
//     <Attendance formData={formData} setFormData={setFormData} />,
//     <Feedback formData={formData} setFormData={setFormData} />,
//   ];

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   const handleSubmit = () => {
//     console.log("Submitting FDP Conducted:", formData);
//     navigate("/template-preview", { state: { data: formData } });
//   };

//   return (
//     <div>
//       <h2>FDP Conducted Form</h2>
//       {steps[step]}
//       <FormNavigation
//         step={step}
//         total={steps.length}
//         nextStep={nextStep}
//         prevStep={prevStep}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// }





import React, { useState } from "react";

const Feedback = ({ data = {}, onChange }) => {
  const [rating, setRating] = useState(data.rating || "");
  const [comments, setComments] = useState(data.comments || "");

  const handleSave = () => {
    onChange({ rating, comments });
  };

  return (
    <div>
      <h3>Feedback</h3>
      <label>Rating (1-5): </label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <br />
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Enter feedback..."
        rows="4"
        style={{ width: "100%", marginTop: "8px" }}
      />
      <br />
      <button onClick={handleSave}>Save Feedback</button>
    </div>
  );
};

export default Feedback;



