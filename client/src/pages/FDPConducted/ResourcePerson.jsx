// export default function ResourcePerson({ formData, setFormData }) {
//   const addPerson = () => {
//     setFormData({
//       ...formData,
//       resourcePersons: [...formData.resourcePersons, { name: "", designation: "", institution: "", email: "", phone: "" }],
//     });
//   };

//   const updatePerson = (index, key, value) => {
//     const updated = [...formData.resourcePersons];
//     updated[index][key] = value;
//     setFormData({ ...formData, resourcePersons: updated });
//   };

//   return (
//     <div>
//       <h3>Resource Persons</h3>
//       {formData.resourcePersons.map((person, i) => (
//         <div key={i}>
//           <input placeholder="Name" value={person.name} onChange={(e) => updatePerson(i, "name", e.target.value)} />
//           <input placeholder="Designation" value={person.designation} onChange={(e) => updatePerson(i, "designation", e.target.value)} />
//           <input placeholder="Institution" value={person.institution} onChange={(e) => updatePerson(i, "institution", e.target.value)} />
//           <input placeholder="Email" value={person.email} onChange={(e) => updatePerson(i, "email", e.target.value)} />
//           <input placeholder="Phone" value={person.phone} onChange={(e) => updatePerson(i, "phone", e.target.value)} />
//         </div>
//       ))}
//       <button onClick={addPerson}>Add Person</button>
//     </div>
//   );
// }





import React, { useState } from "react";

const ResourcePerson = ({ data = [], onChange }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  const addPerson = () => {
    if (name && designation) {
      onChange([...data, { name, designation }]);
      setName("");
      setDesignation("");
    }
  };

  return (
    <div>
      <h3>Resource Persons</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />{" "}
      <button onClick={addPerson}>Add</button>

      <ul>
        {data.map((person, idx) => (
          <li key={idx}>
            {person.name} - {person.designation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcePerson;
