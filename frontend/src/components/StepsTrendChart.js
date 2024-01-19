import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function StepsTrendChart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="steps" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
export default StepsTrendChart;