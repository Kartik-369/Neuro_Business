import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [file,setFile]=useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const handLgout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handUpld = async (e) => {
    e.preventDefault();
    if(!file){
      alert("Please select a file first!");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("please login first");
      navigate("/");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project_name", projectName)
    try {
      const response = await fetch("https://neuro-business-api.onrender.com/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("hasUploaded", "true")
        localStorage.setItem("analysisResults", JSON.stringify(data.analysis_results));
        window.dispatchEvent(new Event('authChange'));
        navigate('/chart', { state: { results: data.analysis_results } });
        console.log(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handFileChng=(e)=>{
    setFile(e.target.files[0]);
  };

  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full shadow-xs shadow-gray-600 border border-stone-200 bg-amber-50/30 p-9 rounded-4xl max-w-md">
            <div className="flex flex-row justify-between items-center mt-3">
              <h1 className="text-xl font-semibold text-gray-800 capitalize sm:text-2xl">
                Choose Upload Files
              </h1>
              <div className="flex justify-center items-center text-2xl">
                  <button onClick={()=>navigate(-1)}
                    className="bg-white text-center w-24 rounded-2xl h-14 relative text-black text-[15px] font-semibold group"
                    type="button"
                  >
                    Go Back
                    <div className="bg-amber-100 rounded-xl h-[39px] w-1/3 flex items-center justify-center absolute -left-6 top-[9px] group-hover:w-[120px] group-active:w-[120px] z-10 duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                      >
                        <path
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                          fill="#000000"
                        ></path>
                        <path
                          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                          fill="#000000"
                        ></path>
                      </svg>
                    </div>
                  </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-gray-700">Dataset File</p>
              <a href="/NeuroBusiness_Template.csv" download className="text-sm font-bold text-emerald-600 hover:text-emerald-800 hover:underline flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Template.csv
              </a>
            </div>
            <label className="block mb-2 font-semibold text-gray-700">Project Name</label>
            <input 
            required
              type="text" 
              className="mb-6 block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                autoFocus
                type="file"
                onChange={handFileChng}
                className="duration-400 block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-amber-100 focus:ring-amber-200 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <p className="text-sm text-zinc-600">
                {file
                  ? `Selected: ${file.name}`
                  : "Supported: csv, excel, etc."}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handUpld}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
              >
                Upload and Analyze
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Upload;