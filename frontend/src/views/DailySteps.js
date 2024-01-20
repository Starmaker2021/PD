import React, { useState, useEffect } from 'react';
import DailyStepsCard from '../components/DailyStepsCard';
import AverageStepsCard from '../components/AverageStepsCard';
import MostActiveDayCard from '../components/MostActiveDayCard';
import StepsTrendCard from '../components/StepsTrendCard';
import CaloriesStepsCard from '../components/CaloriesStepsCard';
import { Row, Col } from 'antd';

function DailySteps() {
  const [dailySteps, setDailySteps] = useState([]);
  const [averageSteps, setAverageSteps] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mostActiveDay, setMostActiveDay] = useState({});
  const [stepsTrend, setStepsTrend] = useState([]);
  const [stepsCalories, setStepsCalories] = useState([]);
  const [timeRange, setTimeRange] = useState('day'); // 可选值: 'day', 'week', 'month', 'year'

  // 获取每日步数
  useEffect(() => {
    fetch('/api/steps/daily')
      .then(response => response.json())
      .then(data => setDailySteps(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // 获取平均步数
  const fetchAverageSteps = () => {
    fetch(`/api/steps/average?startDate=${startDate}&endDate=${endDate}`)
      .then(response => response.json())
      .then(data => setAverageSteps(data.average_steps))
      .catch(error => console.error('Error:', error));
  };

  // 获取步数趋势
  useEffect(() => {
    fetch(`/api/steps/trend?range=${timeRange}`)
      .then(response => response.json())
      .then(data => setStepsTrend(data))
      .catch(error => console.error('Error:', error));
  }, [timeRange]);

  // 获取最活跃的一天
  useEffect(() => {
    fetch('/api/steps/most-active-day')
      .then(response => response.json())
      .then(data => setMostActiveDay(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // 获取步数与卡路里的关系
  useEffect(() => {
    fetch('/api/steps/calories')
      .then(response => response.json())
      .then(data => setStepsCalories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>步数数据分析</h1>
      <Row gutter={16}>
        <Col span={12}>
          <DailyStepsCard dailySteps={dailySteps} />
        </Col>
        <Col span={12}>
          <AverageStepsCard
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            fetchAverageSteps={fetchAverageSteps}
            averageSteps={averageSteps}
          />
          <MostActiveDayCard mostActiveDay={mostActiveDay} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <StepsTrendCard stepsTrend={stepsTrend} timeRange={timeRange} setTimeRange={setTimeRange} />
        </Col>
        <Col span={12}>
          <CaloriesStepsCard stepsCalories={stepsCalories} />
        </Col>
      </Row>
    </div>
  );
}

export default DailySteps;
