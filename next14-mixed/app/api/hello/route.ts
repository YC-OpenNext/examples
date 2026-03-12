import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const middlewareHeader = request.headers.get('x-middleware-test');

  return NextResponse.json({
    message: 'Hello from Next.js 14 API Route',
    timestamp: new Date().toISOString(),
    middlewareApplied: middlewareHeader !== null,
  });
}
