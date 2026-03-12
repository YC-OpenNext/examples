import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from Next.js 13 App Router API',
    timestamp: new Date().toISOString(),
    runtime: 'edge-compatible',
  });
}
