import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DailySteps from './views/DailySteps';
import AverageSteps from './views/AverageSteps'; // 假设您已创建
// 导入其他视图

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/daily-steps" element={<DailySteps />} />
        <Route path="/average-steps" element={<AverageSteps />} />
        {/* 使用element属性设置其他路由 */}
      </Routes>
    </Router>
  );
}

export default App;
