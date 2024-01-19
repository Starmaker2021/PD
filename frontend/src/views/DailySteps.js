import React, { useState, useEffect } from 'react';
import StepsTrendChart from '../components/StepsTrendChart';
import StepsToCaloriesChart from '../components/StepsToCaloriesChart';
import { DatePicker, Button, List } from 'antd';


function DailySteps() {
  const [dailySteps, setDailySteps] = useState([]);

  const [averageSteps, setAverageSteps] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [mostActiveDay, setMostActiveDay] = useState({});
  const [stepsTrend, setStepsTrend] = useState([]);
  const [stepsCalories, setStepsCalories] = useState([]);

  useEffect(() => {
    // 获取每日步数
    fetch('/api/steps/daily')
      .then(response => response.json())
      .then(data => setDailySteps(data))
      .catch(error => console.error('Error:', error));


    // 获取最活跃的一天
    fetch('/api/steps/most-active-day')
      .then(response => response.json())
      .then(data => setMostActiveDay(data))
      .catch(error => console.error('Error:', error));

    // 获取步数趋势
    fetch('/api/steps/trend')
      .then(response => response.json())
      .then(data => setStepsTrend(data))
      .catch(error => console.error('Error:', error));

    // 获取步数与卡路里的关系
    fetch('/api/steps/calories')
      .then(response => response.json())
      .then(data => setStepsCalories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // 获取平均步数
  const fetchAverageSteps = () => {
    fetch(`/api/steps/average?startDate=${startDate}&endDate=${endDate}`)
      .then(response => response.json())
      .then(data => setAverageSteps(data.average_steps))
      .catch(error => console.error('Error:', error));
  };


  return (
    <div>
      <h1>步数数据分析</h1>
      <div>
        <h2>每日步数</h2>
        <List
          size="small"
          bordered
          dataSource={dailySteps}
          renderItem={item => <List.Item>{item.date}: {item.steps}步</List.Item>}
        />
      </div>
      <div>
        <h2>平均步数</h2>
        <DatePicker 
          onChange={(date, dateString) => setStartDate(dateString)} 
        />
        <DatePicker 
          onChange={(date, dateString) => setEndDate(dateString)} 
        />
        <Button onClick={fetchAverageSteps}>查询平均步数</Button>
        <p>{averageSteps}步</p>
      </div>
      <div>
        <h2>最活跃的一天</h2>
        <p>{mostActiveDay.date}: {mostActiveDay.max_steps}步</p>
      </div>
      <div>
        <h2>步数趋势</h2>
        <StepsTrendChart data={stepsTrend} />
      </div>
      <div>
        <h2>卡路里与步数的关系</h2>
        <StepsToCaloriesChart data={stepsCalories} />
      </div>
    </div>
  );
}

export default DailySteps;
