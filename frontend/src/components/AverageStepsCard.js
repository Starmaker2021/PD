import React from 'react';
import { Card, DatePicker, Button } from 'antd';

function AverageStepsCard({ startDate, setStartDate, endDate, setEndDate, fetchAverageSteps, averageSteps }) {

  return (
    <Card title="平均步数" bordered={false}>
      <DatePicker 
        placeholder="开始日期" 
        onChange={(date, dateString) => setStartDate(dateString)} 
      />
      <DatePicker 
        placeholder="结束日期" 
        onChange={(date, dateString) => setEndDate(dateString)} 
      />
      <Button onClick={fetchAverageSteps}>查询平均步数</Button>
      <p>平均步数：{Math.round(averageSteps)}步</p>
    </Card>
  );
}

export default AverageStepsCard;
