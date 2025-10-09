
//client/src/pages/FDPAttended/Summary.jsx




import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function Summary() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const safeFormData = formData || {};

  return (
    <div>
      <h2>Summary</h2>

      <label>Title:</label>
      <input
        type="text"
        placeholder="Enter title"
        value={safeFormData.title || ""}
        onChange={(e) =>
          setFormData({ ...safeFormData, title: e.target.value })
        }
      />
      <br />

      <label>Date:</label>
      <input
        type="date"
        value={safeFormData.date || ""}
        onChange={(e) =>
          setFormData({ ...safeFormData, date: e.target.value })
        }
      />
      <br />

      <label>Venue:</label>
      <input
        type="text"
        placeholder="Enter venue"
        value={safeFormData.venue || ""}
        onChange={(e) =>
          setFormData({ ...safeFormData, venue: e.target.value })
        }
      />
    </div>
  );
}
