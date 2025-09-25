export default function ExpertTalk({ data, setData }) {
  return (
    <div>
      <h3>ExpertTalk File URL</h3>
      <input type="text" value={data.experttalkFile || ""} 
        onChange={(e)=>setData({ ...data, experttalkFile: e.target.value })} />
    </div>
  );
}
