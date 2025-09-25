export default function Summary({ formData, setFormData }) {
  return (
    <div>
      <h3>Summary</h3>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Summary"
        value={formData.summary}
        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
      />
    </div>
  );
}
