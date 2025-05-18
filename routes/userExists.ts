import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Error checking user existence' });
  }
});

export default router;