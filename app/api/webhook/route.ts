import { NextRequest } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    console.log('Webhook payload:', evt.data);

    return new Response('Webhook received', { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error verifying webhook:', errorMessage);

    return new Response('Error verifying webhook', { status: 400 });
  }
}
