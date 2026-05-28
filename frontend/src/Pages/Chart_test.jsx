import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart_test() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [strategy, setStrategy] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const data = location.state?.results;
  
  if (!data || !data.risk) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl text-slate-800 font-bold mb-4">No analysis data found!</h2>
        <button onClick={() => navigate('/upload')} className="bg-stone-800 text-white px-6 py-3 rounded-xl font-bold">
          Go to Workspace
        </button>
      </div>
    );
  }

  const chartData = data.risk.map((customerArray, i) => {
    const displayId = data.customer_ids ? data.customer_ids[i] : `Customer ${i + 1}`;
    
    const actualReasons = data.reasons && data.reasons[i] 
      ? data.reasons[i] 
      : ["AI insights not available for this older project."];

    return {
      name: displayId,
      Safe: Math.round(customerArray[0] * 100),
      Risk: Math.round(customerArray[1] * 100),
      top_reasons: actualReasons
    };
  })
  .sort((a, b) => b.Risk - a.Risk).slice(0, 50);

  const handleGenerateStrategy = async () => {
    setIsGenerating(true);
    setStrategy("");
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch("https://neuro-business-api.onrender.com/strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          customer_id: selectedCustomer.name,
          risk_score: selectedCustomer.Risk,
          reasons: selectedCustomer.top_reasons
        })
      });

      if (response.ok) {
        const result = await response.json();
        setStrategy(result.strategy);
      } else {
        const errorData = await response.json();
        console.error("SERVER REJECTED IT:", errorData) 
        setStrategy(`Backend Error: ${JSON.stringify(errorData.detail)}`);
      }
    } catch (error) {
      console.error(error);
      setStrategy("Network error. Could not reach the AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen pt-28 md:pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-stone-200 pb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-roslindale font-extrabold text-slate-900">
            Top 50 At-Risk Customers
          </h1>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white border border-stone-200 text-black px-6 py-2 rounded-xl font-semibold hover:bg-stone-100 transition w-full md:w-auto"
          >
            Back to Workspace
          </button>
        </div>

        <div className="p-4 md:p-8 bg-white rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
          <p className="text-slate-500 mb-6 font-medium text-sm md:text-base">
            Tap on any red risk bar to view the exact features driving that customer's churn prediction.
          </p>
          
          <div className="w-full overflow-x-auto overflow-y-hidden">
            <div className="min-w-[500px] w-full h-[1200px] md:h-[800px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide /> 
                  <YAxis dataKey="name" type="category" width={110} tick={{fill: '#64748b', fontSize: 11}} />
                  
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Legend verticalAlign="top" height={36}/>
                  
                  <Bar 
                    dataKey="Risk" 
                    stackId="a" 
                    fill="#f43f5e" 
                    name="Churn Risk %" 
                    onClick={(payload) => setSelectedCustomer(payload)}
                    className="cursor-pointer hover:opacity-80 transition-opacity" 
                  />
                  <Bar 
                    dataKey="Safe" 
                    stackId="a" 
                    fill="#10b981" 
                    name="Safe Probability %" 
                    radius={[0, 4, 4, 0]}
                    onClick={(payload) => setSelectedCustomer(payload)}
                    className="cursor-pointer hover:opacity-80 transition-opacity" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4" onClick={() => setSelectedCustomer(null)}>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full border border-stone-100 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs md:text-sm font-bold text-emerald-600 tracking-wider uppercase mb-1">NeuroBusiness AI Insight</p>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedCustomer.name}</h3>
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-red-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex justify-between items-center">
                <span className="font-semibold text-slate-700 text-sm md:text-base">Calculated Churn Risk:</span>
                <span className="text-2xl md:text-3xl font-black text-rose-600">{selectedCustomer.Risk}%</span>
              </div>

              <h4 className="font-bold text-slate-800 mb-3 text-sm md:text-base">Top Churn Drivers:</h4>
              <ul className="space-y-3 mb-8">
                {selectedCustomer.top_reasons && selectedCustomer.top_reasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs md:text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-slate-600 font-medium text-sm md:text-base">{reason}</span>
                  </li>
                ))}
              </ul>

              {strategy ? (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl mb-4">
                  <h4 className="font-bold text-emerald-800 mb-2">Recommended Action Plan:</h4>
                  <p className="text-emerald-900 text-sm whitespace-pre-wrap">{strategy}</p>
                </div>
              ) : (
                <button 
                  onClick={handleGenerateStrategy}
                  disabled={isGenerating}
                  className={`w-full py-3 rounded-xl font-bold transition-colors text-sm md:text-base ${
                    isGenerating ? "bg-stone-400 text-stone-200 cursor-not-allowed" : "bg-stone-800 text-white hover:bg-black"
                  }`}
                >
                  {isGenerating ? "Generating Plan..." : "Generate Retention Strategy"}
                </button>
              )}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}