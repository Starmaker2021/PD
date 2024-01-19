const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',     // 数据库服务器地址
  user: 'root', // 数据库用户名
  password: '727399st', // 数据库密码
  database: 'personaldigital' // 数据库名
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database: ' + error.stack);
    return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});

module.exports = connection;
