
// import React, { useState } from "react";

// export default function ResourcePerson({ formData, setFormData }) {
//   const [person, setPerson] = useState({ name: "", designation: "", institution: "", email: "", phone: "" });

//   const handleChange = (e) => {
//     setPerson({ ...person, [e.target.name]: e.target.value });
//   };

//   const handleAddPerson = () => {
//     const updatedResourcePersons = [...(formData.resourcePersons || []), person];
//     setFormData({ ...formData, resourcePersons: updatedResourcePersons });
//     setPerson({ name: "", designation: "", institution: "", email: "", phone: "" });
//   };

//   return (
//     <div>
//       <h2>Resource Persons</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={person.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="designation"
//         placeholder="Designation"
//         value={person.designation}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="institution"
//         placeholder="Institution"
//         value={person.institution}
//         onChange={handleChange}
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={person.email}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone"
//         value={person.phone}
//         onChange={handleChange}
//       />
//       <button onClick={handleAddPerson}>Add Resource Person</button>

//       <div>
//         <h3>Added Resource Persons:</h3>
//         <ul>
//           {(formData.resourcePersons || []).map((rp, index) => (
//             <li key={index}>
//               {rp.name} - {rp.designation} - {rp.institution} - {rp.email} - {rp.phone}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



// import { useContext, useState } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function ResourcePerson() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);
//   const [person, setPerson] = useState("");

//   const addPerson = () => {
//     if (person.trim()) {
//       updateFormData("resourcePersons", [...formData.resourcePersons, person]);
//       setPerson("");
//     }
//   };

//   return (
//     <div>
//       <h2>Resource Persons</h2>
//       <input
//         type="text"
//         placeholder="Add Resource Person"
//         value={person}
//         onChange={(e) => setPerson(e.target.value)}
//       />
//       <button onClick={addPerson}>Add</button>
//       <ul>
//         {formData.resourcePersons.map((p, i) => (
//           <li key={i}>{p}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }




import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function ResourcePerson() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const addResourcePerson = () => {
    setFormData({
      ...formData,
      resourcePersons: [
        ...(formData.resourcePersons || []),
        { name: "", designation: "", institution: "", email: "", phone: "" }
      ]
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.resourcePersons];
    updated[index][field] = value;
    setFormData({ ...formData, resourcePersons: updated });
  };

  return (
    <div>
      <h2>Resource Persons</h2>
      {formData.resourcePersons?.map((person, idx) => (
        <div key={idx}>
          <input
            type="text"
            placeholder="Name"
            value={person.name}
            onChange={(e) => handleChange(idx, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            value={person.designation}
            onChange={(e) => handleChange(idx, "designation", e.target.value)}
          />
          <input
            type="text"
            placeholder="Institution"
            value={person.institution}
            onChange={(e) => handleChange(idx, "institution", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={person.email}
            onChange={(e) => handleChange(idx, "email", e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={person.phone}
            onChange={(e) => handleChange(idx, "phone", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addResourcePerson}>+ Add Resource Person</button>
    </div>
  );
}
