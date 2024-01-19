import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/daily-steps">每日步数</Link></li>
        <li><Link to="/average-steps">平均步数</Link></li>
        {/* 添加其他链接 */}
      </ul>
    </nav>
  );
}

export default Navbar;
