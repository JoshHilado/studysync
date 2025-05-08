// pages/api/tasks.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/app/db/db';
import { tasks } from '@/app/db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { subject, description, date, userId } = req.body;

    if (!subject || !description || !date || !userId) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      const result = await db.insert(tasks).values({
        subject,
        description,
        date: new Date(date),
        userId: parseInt(userId),
      }).returning();

      res.status(201).json(result[0]);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: 'Error creating task', details: errMsg });
    }
  }

  else if (req.method === 'GET') {
    try {
      const allTasks = await db.select().from(tasks);
      res.status(200).json(allTasks);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: 'Error fetching tasks', details: errMsg });
    }
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
