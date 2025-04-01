const express = require('express');
import connectDB from './db/connection';
import taskRoutes from './routes/tasks';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.static('public'));

app.use('/', taskRoutes);

app.listen(port, () => {
  console.log(`Task Manager app listening on port ${port}`);
});
