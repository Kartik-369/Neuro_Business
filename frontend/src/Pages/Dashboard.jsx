import React,{ useState } from "react";

function Dashboard() {
  const [file,setFile] =useState(null);
  const [results,setResults] = useState(null);
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
      setResults(data); 
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-10 mt-10">
      <input type="file" onChange={handleFileChange} className="mb-4 block" />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Analyze Customers
      </button>
      {results && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-green-600 font-bold">Success!</p>
        </div>
      )}
    </div>
  );
}
export default Dashboard;