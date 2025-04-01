const express = require('express');
import connectDB from './db/connection';
import taskRoutes from './routes/tasks';

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies and serve static files
app.use(express.json());
app.use(express.static('public'));

// Task routes
app.use('/', taskRoutes);

app.listen(port, () => {
  console.log(`Task Manager app listening on port ${port}`);
});
