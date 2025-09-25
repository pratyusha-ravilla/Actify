export default function GeoTagPhotos({ formData, setFormData }) {
  const addPhoto = () => {
    setFormData({ ...formData, geoTagPhotos: [...formData.geoTagPhotos, ""] });
  };
  const updatePhoto = (index, value) => {
    const updated = [...formData.geoTagPhotos];
    updated[index] = value;
    setFormData({ ...formData, geoTagPhotos: updated });
  };

  return (
    <div>
      <h3>Geo Tag Photos</h3>
      {formData.geoTagPhotos.map((photo, i) => (
        <input key={i} placeholder="Photo URL" value={photo} onChange={(e) => updatePhoto(i, e.target.value)} />
      ))}
      <button onClick={addPhoto}>Add Photo</button>
    </div>
  );
}
