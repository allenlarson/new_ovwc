import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const count = await client.db('ovwc').collection('proposals').countDocuments();
    return NextResponse.json({ status: 'ok', proposals: count });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
