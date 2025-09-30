import React from "react";
import TemplatePreview from "../../components/TemplatePreview";

const TemplatePage = () => {
  const dummyData = {
    title: "FDP on AI",
    summary: "This FDP covered basics of AI and ML.",
  };

  return (
    <div>
      <h2>Template Preview</h2>
      <TemplatePreview data={dummyData} />
    </div>
  );
};

export default TemplatePage;
