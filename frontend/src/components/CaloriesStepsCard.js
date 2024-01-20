import React from 'react';
import { Card } from 'antd';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function CaloriesStepsCard({stepsCalories}) {
  return (
    <Card title="卡路里与步数的关系" bordered={false}>
    <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="steps" name="步数" unit="步" />
      <YAxis type="number" dataKey="calories" name="卡路里" unit="卡" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="卡路里 vs 步数" data={stepsCalories} fill="#8884d8" />
    </ScatterChart>
    </Card>
  );
}

export default CaloriesStepsCard;
