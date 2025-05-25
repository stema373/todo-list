import express, { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { admin } from '../firebase-config';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:idToken', async (req: Request, res: Response) => {
  const { idToken } = req.params;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken as string);
    const uid = decodedToken.uid;
    console.log('Getting username for uid:', uid);

    type UserResult = {
      username: string;
      id: number;
    }[];
    const user = await prisma.$queryRaw<UserResult>`
      SELECT username, id FROM "User" WHERE uid = ${uid}
    `;

    if (user && user[0]) {
      console.log('Found user:', user[0]);
      res.json({ username: user[0].username, id: user[0].id });
    } else {
      console.log('User not found for uid:', uid);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving username:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;