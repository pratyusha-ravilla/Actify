
//client/src/pages/FDPAttended/ResourcePerson.jsx

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
