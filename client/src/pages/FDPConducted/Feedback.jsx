export default function Feedback({ formData, setFormData }) {
  return (
    <div>
      <h3>Feedback</h3>
      <textarea
        placeholder="Feedback JSON"
        value={JSON.stringify(formData.feedback)}
        onChange={(e) => setFormData({ ...formData, feedback: JSON.parse(e.target.value || "{}") })}
      />
    </div>
  );
}
