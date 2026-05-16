import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null); // Added to track backend errors
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      setApiError(null);
      const response = await fetch("http://127.0.0.1:8000/projects", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
        return;
      }

      const data = await response.json();

      // CRITICAL FIX: Ensure data is an array before setting state
      if (response.ok && Array.isArray(data)) {
        setProjects(data);
      } else {
        // If it's a 400 error, grab the backend message
        console.error("Backend returned an error payload:", data);
        setApiError(data.detail || data.message || "Failed to load projects from server.");
        setProjects([]); // Fallback to safe empty array
      }
      setLoading(false);
    } catch (error) {
      console.error("Network/Parsing error fetching projects:", error);
      setApiError("A network error occurred. Please try again.");
      setProjects([]);
      setLoading(false);
    }
  };

  const handleDelete = async (e, projectId) => {
    e.preventDefault();
    e.stopPropagation(); 
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        setProjects(projects.filter(p => p._id !== projectId)); 
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openProject = (project) => {
    navigate('/chart', { state: { results: project.analysis_results } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading workspace...</p>
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-8">
          <div>
            <h1 className="text-[40px] md:text-6xl font-roslindale font-extrabold text-slate-900 mb-2">
              My Workspace
            </h1>
            <p className="text-slate-600 md:text-xl">
              Access and manage your revenue forecasts.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <button onClick={() => navigate(-1)} className="bg-amber-50 border border-stone-200 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-amber-100 transition duration-300">
              Go Back
            </button>
            <button 
              onClick={() => navigate('/upload')} 
              className="bg-stone-800 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-black hover:shadow-lg transition-all duration-300"
            >
              + New Analysis
            </button>
          </div>
        </div>

        {/* Display backend errors dynamically if they happen */}
        {apiError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl max-w-2xl mx-auto text-center">
            <p className="font-semibold">Backend Error (400):</p>
            <p className="text-sm mt-1">{apiError}</p>
          </div>
        )}
        
        {/* Added Array.isArray check to ensure safe evaluation */}
        {!Array.isArray(projects) || projects.length === 0 ? (
          <div className="w-full shadow-xs shadow-gray-600 border border-stone-200 bg-amber-50/30 p-12 rounded-4xl max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No data found</h2>
            <p className="text-gray-600 mb-8">You haven't run any churn forecasts yet.</p>
            <button 
              onClick={() => navigate('/upload')} 
              className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none"
            >
              Upload your first dataset
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => openProject(project)}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-gray-300 hover:-translate-y-1 hover:shadow-2xl active:shadow-2xl transition-all duration-300 cursor-pointer relative group flex flex-col h-full"
              >
                <button
                  onClick={(e) => handleDelete(e, project._id)}
                  className="absolute top-6 right-6 bg-red-50 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all duration-300 z-10"
                  title="Delete Project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                <h2 className="text-2xl font-semibold text-slate-900 mb-1 pr-8 line-clamp-2">
                  {project.project_name}
                </h2>
                <p className="text-slate-400 text-sm mb-6 font-medium">
                  {project.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                </p>
                <div className="mt-auto">
                  <div className="text-5xl font-bold bg-linear-to-br from-teal-600 to-emerald-900 text-transparent bg-clip-text mb-2">
                    {project.analysis_results?.customer_ids?.length || 0}
                  </div>
                  <div className="text-lg font-semibold text-slate-900">Customers Analyzed</div>
                </div>
                <div className="mt-6 flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  View Results
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}