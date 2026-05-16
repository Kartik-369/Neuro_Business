import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function Chart_test() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const data = location.state?.results
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
    const reasons = data.reasons && data.reasons[i] ? data.reasons[i]: ["AI insights not available for this older project."];
    return {
      name: displayId,
      Safe: Math.round(customerArray[0] * 100),
      Risk: Math.round(customerArray[1] * 100),
      top_reasons: reasons
    };
  });
  const handleBarClick = (dataElement) => {
    if (dataElement && dataElement.activePayload && dataElement.activePayload.length > 0) {
      const customerData = dataElement.activePayload[0].payload;
      setSelectedCustomer(customerData);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-6">
          <h1 className="text-4xl font-roslindale font-extrabold text-slate-900">
            Churn Risk Overview
          </h1>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white border border-stone-200 text-black px-6 py-2 rounded-xl font-semibold hover:bg-stone-100 transition"
          >
            Back to Workspace
          </button>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
          <p className="text-slate-500 mb-8 font-medium">
            Click on any red risk bar to view the exact features driving that customer's churn prediction.
          </p>
          
          <div className="overflow-x-auto">
            <BarChart width={800} height={400} data={chartData} className="cursor-pointer">
              <XAxis dataKey="name" tick={{fill: '#64748b'}} />
              <YAxis tick={{fill: '#64748b'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Legend wrapperStyle={{paddingTop: '20px'}}/>
              
              <Bar dataKey="Safe" fill="#10b981" radius={[4, 4, 0, 0]} name="Safe Probability %" />
              <Bar dataKey="Risk" onClick={(barData) => setSelectedCustomer(barData)} fill="#f43f5e" radius={[4, 4, 0, 0]} name="Churn Risk %" />
            </BarChart>
          </div>
        </div>
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedCustomer(null)}>
            
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-stone-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm font-bold text-emerald-600 tracking-wider uppercase mb-1">NeuroBusiness AI Insight</p>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCustomer.name}</h3>
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-red-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Calculated Churn Risk:</span>
                <span className="text-2xl font-black text-rose-600">{selectedCustomer.Risk}%</span>
              </div>

              <h4 className="font-bold text-slate-800 mb-3">Top 3 Churn Drivers:</h4>
              <ul className="space-y-3 mb-8">
                {selectedCustomer.top_reasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-slate-600 font-medium">{reason}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-stone-800 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors">
                Generate Retention Strategy
              </button>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}