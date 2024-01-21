const express = require('express');
const router = express.Router();
const db = require('../db/database');

// 定义一个路由来获取活动数据
router.get('/activity', (req, res) => {
  // SQL 查询逻辑
  db.query('SELECT * FROM activity', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//每日步数
router.get('/steps/daily', (req, res) => {
  db.query('SELECT date, steps FROM activity ORDER BY date', (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

//平均步数
router.get('/steps/average', (req, res) => {
  const { startDate, endDate } = req.query;
  db.query('SELECT AVG(steps) AS average_steps FROM activity WHERE date BETWEEN ? AND ?', [startDate, endDate], (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results[0]);
    }
  });
});

//步数最多的一天
router.get('/steps/most-active-day', (req, res) => {
  db.query('SELECT date, steps AS max_steps FROM activity ORDER BY steps DESC LIMIT 1', (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results[0]);
    }
  });
});

//步数趋势
router.get('/steps/trend', (req, res) => {
  const range = req.query.range || 'day';
  let query = '';

  switch(range) {
    case 'day':
      query = 'SELECT date, SUM(steps) AS steps FROM activity GROUP BY date ORDER BY date ASC LIMIT 12';
      break;
    case 'week':
      query = 'SELECT YEARWEEK(date) AS week, SUM(steps) AS steps FROM activity GROUP BY week ORDER BY week ASC LIMIT 12';
      break;
    case 'month':
      query = 'SELECT DATE_FORMAT(date, "%Y-%m") AS month, SUM(steps) AS steps FROM activity GROUP BY month ORDER BY month ASC LIMIT 12';
      break;
    case 'year':
      query = 'SELECT YEAR(date) AS year, SUM(steps) AS steps FROM activity GROUP BY year ORDER BY year ASC LIMIT 12';
      break;
    default:
      res.status(400).send('Invalid range');
      return;
  } 

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

//步数与卡路里之间的关系
router.get('/steps/calories', (req, res) => {
  db.query('SELECT steps, calories FROM activity', (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

//步数合格率
router.get('/steps/assessment', (req, res) => {
  const { range, passingSteps } = req.query;
  
  // 确定日期范围
  const endDate = new Date();
  const startDate = new Date();
  if (range === "month") {
    startDate.setMonth(endDate.getMonth() - 1);
  } else if (range === "year") {
    startDate.setFullYear(endDate.getFullYear() - 1);
  } else {
    return res.status(400).send('Invalid range');
  }
  
  // 构建查询
  const query = `
    SELECT COUNT(*) AS totalDays,
           SUM(CASE WHEN steps >= ? THEN 1 ELSE 0 END) AS passingDays
    FROM activity
    WHERE date BETWEEN ? AND ?`;

  // 执行查询
  db.query(query, [parseInt(passingSteps, 10), startDate, endDate], (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving data');
    } else {
      const { totalDays, passingDays } = results[0];
      const passingRate = (passingDays / totalDays * 100).toFixed(2);
      res.json({ passingRate });
    }
  });
});

//步数分段统计
router.get('/steps/monthly-segment', (req, res) => {
  const year = req.query.year || new Date().getFullYear(); // 默认为当前年份
  const query = `
      SELECT 
          DATE_FORMAT(date, '%Y-%m') AS month,
          SUM(CASE WHEN steps BETWEEN 0 AND 5000 THEN 1 ELSE 0 END) AS '0-5000',
          SUM(CASE WHEN steps BETWEEN 5001 AND 10000 THEN 1 ELSE 0 END) AS '5001-10000',
          SUM(CASE WHEN steps BETWEEN 10001 AND 20000 THEN 1 ELSE 0 END) AS '10001-20000',
          SUM(CASE WHEN steps > 20000 THEN 1 ELSE 0 END) AS '20001+'
      FROM activity
      WHERE YEAR(date) = ?
      GROUP BY month
      ORDER BY month;
  `;

  db.query(query, [year], (error, results) => {
      if (error) {
          return res.status(500).send('Error retrieving data');
      }
      res.json(results);
  });
});

module.exports = router;
