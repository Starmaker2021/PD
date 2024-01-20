import React from 'react';
import { Card } from 'antd';

function MostActiveDayCard({ mostActiveDay }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <Card title="最活跃的一天" bordered={false}>
      <p>{formatDate(mostActiveDay.date)}: {mostActiveDay.max_steps}步</p>
    </Card>
  );
}

export default MostActiveDayCard;
