import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { admin } from '../firebase-config';

const router = express.Router();
const prisma = new PrismaClient();

// Get all tasks for a user
router.get('/:idToken', async (req: Request, res: Response) => {
  const { idToken } = req.params;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { tasks: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ tasks: user.tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/:idToken', async (req: Request, res: Response) => {
  const { idToken } = req.params;
  const { title } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        userId: user.id
      }
    });

    res.status(201).json({ task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update a task
router.put('/:idToken/:taskId', async (req: Request, res: Response) => {
  const { idToken, taskId } = req.params;
  const { title, completion } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(taskId),
        userId: user.id
      }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    const task = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: {
        title: title !== undefined ? title : undefined,
        completion: completion !== undefined ? completion : undefined
      }
    });

    res.json({ task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:idToken/:taskId', async (req: Request, res: Response) => {
  const { idToken, taskId } = req.params;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(taskId),
        userId: user.id
      }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    await prisma.task.delete({
      where: { id: parseInt(taskId) }
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

export default router; 