import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DailySteps from './views/DailySteps';

// 导入其他视图

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/daily-steps" element={<DailySteps />} />
        {/* 使用element属性设置其他路由 */}
      </Routes>
    </Router>
  );
}

export default App;
