import express from 'express';
const router = express.Router();
import Task from '../models/task';

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create a new task
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  const task = new Task({ title });
  await task.save();
  res.status(201).json(task);
});

// Update task status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (status && (status === 'pending' || status === 'completed')) {
    task.status = status;
    await task.save();
  }
  res.json(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json({ success: true });
});

module.exports = router;
