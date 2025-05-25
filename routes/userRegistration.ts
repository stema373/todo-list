import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  const { username, email, uid } = req.body;
  console.log('Received registration request:', { username, email, uid });

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      type UserResult = {
        id: number;
        username: string;
        email: string;
        uid: string;
      }[];
      const result = await prisma.$queryRaw<UserResult>`
        INSERT INTO "User" (username, email, uid)
        VALUES (${username}, ${email}, ${uid})
        RETURNING id, username, email, uid
      `;
      user = result[0];
      console.log('Created new user:', user);
    } else {
      console.log('User already exists:', user);
    }

    res.status(200).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

export default router;