export default function TOC({ formData, setFormData }) {
  return (
    <div>
      <h3>Table of Contents</h3>
      <textarea
        placeholder="TOC"
        value={formData.toc}
        onChange={(e) => setFormData({ ...formData, toc: e.target.value })}
      />
    </div>
  );
}
