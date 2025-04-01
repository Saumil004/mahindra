import express from 'express'
import cors from 'cors'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const app = express()
const port = 3000

// Setup database
const adapter = new JSONFile('db.json')
const db = new Low(adapter)
await db.read()
db.data ||= { tasks: [] }

app.use(cors())
app.use(express.json())

// Get all tasks
app.get('/tasks', async (req, res) => {
  await db.read()
  res.json(db.data.tasks)
})

// Create a task
app.post('/tasks', async (req, res) => {
  const task = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  }
  db.data.tasks.push(task)
  await db.write()
  res.json(task)
})

// Update a task
app.patch('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const taskIndex = db.data.tasks.findIndex(t => t.id === id)
  
  if (taskIndex !== -1) {
    db.data.tasks[taskIndex] = {
      ...db.data.tasks[taskIndex],
      ...req.body
    }
    await db.write()
    res.json(db.data.tasks[taskIndex])
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
})

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  db.data.tasks = db.data.tasks.filter(t => t.id !== id)
  await db.write()
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})