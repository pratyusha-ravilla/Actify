
// import React, { useState, useEffect } from "react";

// export default function Feedback({ formData, setFormData }) {
//   const [feedbackText, setFeedbackText] = useState("");
//   const [feedbackList, setFeedbackList] = useState([]);

//   // Initialize feedbackList as an array
//   useEffect(() => {
//     if (Array.isArray(formData.feedback)) {
//       setFeedbackList(formData.feedback);
//     } else {
//       setFeedbackList([]);
//       setFormData({ ...formData, feedback: [] }); // Ensure formData.feedback is array
//     }
//   }, [formData, setFormData]);

//   const handleAddFeedback = () => {
//     if (!feedbackText) return;
//     const updatedFeedback = [...feedbackList, feedbackText];
//     setFeedbackList(updatedFeedback);
//     setFormData({ ...formData, feedback: updatedFeedback });
//     setFeedbackText("");
//   };

//   return (
//     <div>
//       <h2>Feedback</h2>
//       <textarea
//         placeholder="Enter feedback"
//         value={feedbackText}
//         onChange={(e) => setFeedbackText(e.target.value)}
//       />
//       <button onClick={handleAddFeedback}>Add Feedback</button>

//       <div>
//         <h3>Feedback List:</h3>
//         {feedbackList.length === 0 ? (
//           <p>No feedback added yet.</p>
//         ) : (
//           <ul>
//             {feedbackList.map((fb, index) => (
//               <li key={index}>{fb}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



// import { useContext, useState } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function Feedback() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const addFeedback = () => {
//     if (question && answer) {
//       updateFormData("feedback", { ...formData.feedback, [question]: answer });
//       setQuestion("");
//       setAnswer("");
//     }
//   };

//   return (
//     <div>
//       <h2>Feedback</h2>
//       <input
//         type="text"
//         placeholder="Question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Answer"
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//       />
//       <button onClick={addFeedback}>Add Feedback</button>
//       <ul>
//         {Object.entries(formData.feedback).map(([q, a], i) => (
//           <li key={i}>
//             {q}: {a}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



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
