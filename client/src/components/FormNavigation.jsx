

//client/src/components/FormNavigation.jsx

import React from "react";

const FormNavigation = ({ currentStep, totalSteps, handleNext, handleBack, handleSubmit }) => {
  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
      <button onClick={handleBack} disabled={currentStep === 0}>
        Back
      </button>
      {currentStep === totalSteps - 1 ? (
        <button onClick={handleSubmit}>Submit</button>
      ) : (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default FormNavigation;
