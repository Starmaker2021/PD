import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function StepsToCaloriesChart({ data }) {
  return (
    <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="steps" name="步数" unit="步" />
      <YAxis type="number" dataKey="calories" name="卡路里" unit="卡" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="卡路里 vs 步数" data={data} fill="#8884d8" />
    </ScatterChart>
  );
}

export default StepsToCaloriesChart;
