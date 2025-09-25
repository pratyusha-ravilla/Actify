export default function Attendance({ formData, setFormData }) {
  return (
    <div>
      <h3>Attendance File</h3>
      <input
        type="text"
        placeholder="Attendance File URL"
        value={formData.attendanceFile}
        onChange={(e) => setFormData({ ...formData, attendanceFile: e.target.value })}
      />
    </div>
  );
}
