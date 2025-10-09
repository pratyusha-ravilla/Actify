//client/src/pages/FDPAttended/FDPAttendedForm.jsx

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// import Summary from "./Summary";
// import TOC from "./TOC";
// import ResourcePerson from "./ResourcePerson";
// import GeoTagPhotos from "./GeoTagPhotos";
// import Attendance from "./Attendance";
// import Feedback from "./Feedback";
// import UploadBrochure from "./UploadBrochure";

// import { createFDPAttended } from "../../services/fdpAttendedService";

// export default function FDPAttendedForm() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const { formData } = useContext(FDPAttendedContext);

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   const handleSubmit = async () => {
//     if (!formData.title) {
//       alert("Title is required");
//       return;
//     }
//     try {
//       await createFDPAttended(formData);
//       navigate("/template-preview"); // fixed path
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting form");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>FDP Attended Form</h1>

//       {step === 1 && <Summary />}
//       {step === 2 && <TOC />}
//       {step === 3 && <ResourcePerson />}
//       {step === 4 && <GeoTagPhotos />}
//       {step === 5 && <Attendance />}
//       {step === 6 && <Feedback />}
//       {step === 7 && <UploadBrochure />}

//       <div style={{ marginTop: "20px" }}>
//         {step > 1 && <button onClick={prevStep}>Previous</button>}
//         {step < 7 && <button onClick={nextStep}>Next</button>}
//         {step === 7 && (
//           <button onClick={handleSubmit}>Submit & Preview Template</button>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

import Summary from "./summary";
import TOC from "./TOC";
import ResourcePerson from "./ResourcePerson";
import GeoTagPhotos from "./GeoTagPhotos";
import Attendance from "./Attendance";
import Feedback from "./Feedback";
import UploadBrochure from "./UploadBrochure";

import { createFDPAttended } from "../../services/fdpAttendedService";

export default function FDPAttendedForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { formData } = useContext(FDPAttendedContext);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }

    try {
      const savedData = await createFDPAttended(formData);
      console.log("✅ FDP Attended saved:", savedData);
      navigate("/template-preview", { state: { data: savedData } }); // ✅ Pass saved data
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting form");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FDP Attended Form</h1>

      {step === 1 && <Summary />}
      {step === 2 && <TOC />}
      {step === 3 && <ResourcePerson />}
      {step === 4 && <GeoTagPhotos />}
      {step === 5 && <Attendance />}
      {step === 6 && <Feedback />}
      {step === 7 && <UploadBrochure />}

      <div style={{ marginTop: "20px" }}>
        {step > 1 && <button onClick={prevStep}>Previous</button>}
        {step < 7 && <button onClick={nextStep}>Next</button>}
        {step === 7 && (
          <button onClick={handleSubmit}>Submit & Preview Template</button>
        )}
      </div>
    </div>
  );
}
