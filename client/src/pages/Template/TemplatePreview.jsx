export default function TemplatePreview({ data }) {
  return (
    <div>
      <h2>Template Preview</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => alert("Template approved!")}>Confirm & Continue</button>
    </div>
  );
}
