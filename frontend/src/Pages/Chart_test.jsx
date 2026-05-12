import React from 'react';
// THE FIX: Import the exact BarChart components you are actually using
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Chart_test({ data }) {
  if (!data) {
    return null;
  }

  const chartData = data.map((customerArray, index) => ({
    name: `Customer ${index + 1}`,
    Safe: Math.round(customerArray[0] * 100),
    Risk: Math.round(customerArray[1] * 100)
  }));

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