import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const _body = await request.json();
    // In production, forward to an email or CRM provider
    // Here, respond OK to enable optimistic UI and offline queueing
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

