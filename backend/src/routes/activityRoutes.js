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

module.exports = router;
