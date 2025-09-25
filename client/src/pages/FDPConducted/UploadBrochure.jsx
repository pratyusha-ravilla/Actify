export default function UploadBrochure({ formData, setFormData }) {
  return (
    <div>
      <h3>Upload Brochure</h3>
      <input
        type="text"
        placeholder="Brochure URL or path"
        value={formData.brochure}
        onChange={(e) => setFormData({ ...formData, brochure: e.target.value })}
      />
    </div>
  );
}
