import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  const { username, email } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: username,
          email: email,
        },
      });
    }

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

export default router;