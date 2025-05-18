import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
const serviceAccount = require('../todo-list-525d9-firebase-adminsdk-20gpn-4638f89e9b.json');

const router = express.Router();
const prisma = new PrismaClient();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.get('/:idToken', async (req: Request, res: Response) => {
  const { idToken } = req.params;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken as string);
    const email = decodedToken.email;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving username:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;