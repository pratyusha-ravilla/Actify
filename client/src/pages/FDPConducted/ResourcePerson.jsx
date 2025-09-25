export default function ResourcePerson({ formData, setFormData }) {
  const addPerson = () => {
    setFormData({
      ...formData,
      resourcePersons: [...formData.resourcePersons, { name: "", designation: "", institution: "", email: "", phone: "" }],
    });
  };

  const updatePerson = (index, key, value) => {
    const updated = [...formData.resourcePersons];
    updated[index][key] = value;
    setFormData({ ...formData, resourcePersons: updated });
  };

  return (
    <div>
      <h3>Resource Persons</h3>
      {formData.resourcePersons.map((person, i) => (
        <div key={i}>
          <input placeholder="Name" value={person.name} onChange={(e) => updatePerson(i, "name", e.target.value)} />
          <input placeholder="Designation" value={person.designation} onChange={(e) => updatePerson(i, "designation", e.target.value)} />
          <input placeholder="Institution" value={person.institution} onChange={(e) => updatePerson(i, "institution", e.target.value)} />
          <input placeholder="Email" value={person.email} onChange={(e) => updatePerson(i, "email", e.target.value)} />
          <input placeholder="Phone" value={person.phone} onChange={(e) => updatePerson(i, "phone", e.target.value)} />
        </div>
      ))}
      <button onClick={addPerson}>Add Person</button>
    </div>
  );
}
