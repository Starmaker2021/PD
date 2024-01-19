const express = require('express');
const app = express();
const activityRoutes = require('./routes/activityRoutes');

// 使用路由
app.use('/api', activityRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});