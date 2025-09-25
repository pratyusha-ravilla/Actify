export default function Conducted({ data, setData }) {
  return (
    <div>
      <h3>Conducted File URL</h3>
      <input type="text" value={data.conductedFile || ""} 
        onChange={(e)=>setData({ ...data, conductedFile: e.target.value })} />
    </div>
  );
}
