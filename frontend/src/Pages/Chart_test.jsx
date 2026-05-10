import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Chart_test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // This "calls" the Python backend automatically when the page loads
    fetch('http://localhost:8000/api/revenue')
      .then(response => response.json())
      .then(json => setData(json)) // The data is now "live" in your app
      .catch(err => console.log("Backend not running?"));
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Actual_Revenue" stroke="#8884d8" />
          <Line type="monotone" dataKey="Predicted_Revenue" stroke="#82ca9d" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Chart_test;