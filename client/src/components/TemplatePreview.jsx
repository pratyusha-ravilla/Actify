import { useLocation, useNavigate } from "react-router-dom";

export default function TemplatePreview() {
  const { state } = useLocation();
  const data = state?.data;
  const navigate = useNavigate();

  if (!data) return <p>No data to preview</p>;

  const handleConfirm = () => {
    // proceed to download page
    navigate("/download", { state: { data } });
  };

  return (
    <div>
      <h2>Template Preview</h2>
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <button onClick={handleConfirm}>Confirm & Continue</button>
    </div>
  );
}
