import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { admin } from '../firebase-config';

const router = express.Router();
const prisma = new PrismaClient();

router.delete('/:uid', async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    // Get user from database
    type UserResult = {
      id: number;
      uid: string;
    }[];
    const users = await prisma.$queryRaw<UserResult>`
      SELECT id, uid FROM "User" WHERE uid = ${uid}
    `;
    const user = users[0];

    if (!user) {
      console.error('User not found in database for uid:', uid);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Found user in database:', user);

    // Delete user's todos first (due to foreign key constraint)
    const deletedTasks = await prisma.task.deleteMany({
      where: {
        userId: user.id
      }
    });
    console.log('Deleted tasks:', deletedTasks);

    // Delete the user from the database
    const deletedUser = await prisma.user.delete({
      where: {
        id: user.id
      }
    });
    console.log('Deleted user from database:', deletedUser);

    // Delete the user from Firebase Authentication
    await admin.auth().deleteUser(user.uid);
    console.log('Deleted user from Firebase Auth');

    res.json({ message: 'Account deleted successfully' });
  } catch (error: any) {
    console.error('Detailed error deleting account:', error);
    res.status(500).json({ error: 'An error occurred while deleting the account', details: error.message });
  }
});

export default router; 