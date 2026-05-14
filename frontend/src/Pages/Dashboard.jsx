import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
  };
  const handleUpload=async()=>{
    if(!file){
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict",{
        method:"POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      navigate('/chart', { state: { results: data } });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div className="p-10 mt-10">
      <input type="file" onChange={handleFileChange} className="mb-4 block" />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Analyze Customers
      </button>
    </div>
    </>
  );
}
export default Dashboard;