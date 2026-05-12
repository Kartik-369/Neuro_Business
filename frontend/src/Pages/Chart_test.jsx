import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Chart_test() {
  const Location = useLocation();
  const data=Location.state?.results;
  if (!data || !data.risk) {
    return null;
  }
  const chartData = data.risk.map((customer, i) => {
    const displayId = data.customer_ids ? data.customer_ids[i] : `Customer ${i + 1}`;
    return{
      name: displayId,
      Safe: Math.round(customer[0]*100),
      Risk: Math.round(customer[1]*100)
    };
  });

  return (
    <div className="mt-8 p-4 bg-white rounded shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Customer Churn Risk Overview</h2>
          
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Safe" fill="#4ade80" />
        <Bar dataKey="Risk" fill="#ef4444" />
      </BarChart>
    </div>
  );
}

export default Chart_test;