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

export default function FDPAttendedForm() {
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
    // Here you can call API to save formData
    console.log("Submitting FDP Attended:", formData);
    navigate("/template-preview", { state: { data: formData } });
  };

  return (
    <div>
      <h2>FDP Attended Form</h2>
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
