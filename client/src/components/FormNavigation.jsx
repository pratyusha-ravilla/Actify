import React from "react";

export default function FormNavigation({ step, total, nextStep, prevStep, onSubmit }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {step > 0 && <button onClick={prevStep}>Previous</button>}

      {step < total - 1 && <button onClick={nextStep}>Next</button>}

      {step === total - 1 && (
        <button onClick={onSubmit} style={{ marginLeft: "10px" }}>
          Submit
        </button>
      )}
    </div>
  );
}
