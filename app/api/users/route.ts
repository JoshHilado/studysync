// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/app/db/db';
import { users } from '@/app/db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      const result = await db.insert(users).values({
        name,
        email,
        password,
      }).returning();

      res.status(201).json(result[0]);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: 'Error creating user', details: errMsg });
    }
  }

  else if (req.method === 'GET') {
    try {
      const allUsers = await db.select().from(users);
      res.status(200).json(allUsers);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: 'Error fetching users', details: errMsg });
    }
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
