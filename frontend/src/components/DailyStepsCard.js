import React from 'react';
import { Card, Table } from 'antd';

function DailyStepsCard({ dailySteps }) {
  // 转换日期格式
  const formattedData = dailySteps.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString() // 转换为年月日格式
  }));

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: '步数',
      dataIndex: 'steps',
      key: 'steps',
      sorter: (a, b) => a.steps - b.steps,
    },
  ];

  return (
    <Card title="每日步数" bordered={false}>
      <Table 
        columns={columns} 
        dataSource={formattedData} 
        pagination={{ pageSize: 10 }}
        rowKey="date" // 假设每个日期是唯一的
      />
    </Card>
  );
}

export default DailyStepsCard;
