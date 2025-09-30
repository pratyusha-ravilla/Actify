import React from "react";

export default function Summary({ formData = {}, setFormData }) {
  // Provide fallback so app doesn't crash
  const { title = "", summary = "" } = formData;

  return (
    <div>
      <h2>Summary</h2>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <textarea
        placeholder="Enter Summary"
        value={summary}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, summary: e.target.value }))
        }
      />
    </div>
  );
}
