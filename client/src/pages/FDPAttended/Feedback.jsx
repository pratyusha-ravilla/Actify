

//client/src/FDPAttended/Feedback.jsx

import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
export default function Feedback() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  return (
    <div>
      <h2>Feedback</h2>
      <textarea
        rows="4"
        cols="50"
        value={formData.feedback}
        onChange={(e) =>
          setFormData({ ...formData, feedback: e.target.value })
        }
      />
    </div>
  );
}
