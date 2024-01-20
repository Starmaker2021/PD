import React from 'react';
import { Card, Button } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function StepsTrendCard({ stepsTrend, timeRange, setTimeRange }) {
  // 根据不同的时间范围格式化日期
  const formatDate = (data, range) => {
    if (!data) return ''; // 添加这一行来检查undefined或空值
  
    switch(range) {
      case 'week':
        return `Week ${data}`;
      case 'month':
        return `Month ${data}`;
      case 'year':
        return `Year ${data}`;
      default:
        return new Date(data).toLocaleDateString();
    }
  };
  
  
  // 在 StepsTrendCard 组件中，根据 range 选择正确的 dataKey
  const dataKey = timeRange === 'day' ? 'date' : timeRange;
  const formattedData = stepsTrend.map(item => ({
    ...item,
    date: item[dataKey] ? formatDate(item[dataKey], timeRange) : 'No Date' // 保护性检查
  }));
  

  return (
    <Card title="步数趋势" bordered={false}>
      <div>
        <Button onClick={() => setTimeRange('day')}>天</Button>
        <Button onClick={() => setTimeRange('week')}>周</Button>
        <Button onClick={() => setTimeRange('month')}>月</Button>
        <Button onClick={() => setTimeRange('year')}>年</Button>
      </div>
      <LineChart width={600} height={300} data={formattedData}>
        <Line type="monotone" dataKey="steps" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </Card>
  );
}

export default StepsTrendCard;
