import React, { useEffect } from 'react';
import { Card, InputNumber, Typography, Select } from 'antd';
const { Option } = Select;
const { Text } = Typography;

function StepsAssessmentCard({ passingSteps, setPassingSteps, fetchPassingRate, passingRate, range, setRange }) {
  // 当 passingSteps 或 range 更改时，自动更新合格率
  useEffect(() => {
    fetchPassingRate();
  }, [passingSteps, range, fetchPassingRate]);

  return (
    <Card title="步数评估" style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Text>合格步数：</Text>
        <InputNumber min={1} value={passingSteps} onChange={(value) => setPassingSteps(value)} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text>时间范围：</Text>
        <Select value={range} style={{ width: 120 }} onChange={(value) => setRange(value)}>
          <Option value="month">最近一个月</Option>
          <Option value="year">最近一年</Option>
        </Select>
      </div>
      {passingRate !== null && <p style={{ marginTop: 16 }}>合格率：{passingRate}%</p>}
    </Card>
  );
}

export default StepsAssessmentCard;
