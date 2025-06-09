// app/api/auth/login/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { login, password } = await req.json();

  // Forward the login to your actual auth service
  const authRes = await fetch(`${process.env.NEXT_PUBLIC_AUTHENTICATION_URL}/api/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!authRes.ok) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  const { token } = await authRes.json();


  const response = NextResponse.json({ success: true , token});

  response.cookies.set('Admin-Authorization', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
    maxAge: 60 * 60 , // 1 day
  });
  return response;
}
