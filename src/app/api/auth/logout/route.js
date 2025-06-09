import { NextResponse } from 'next/server';
// clear the validation of cookies 

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });

  // Expire the cookie by setting it in the past
  response.cookies.set('Admin-Authorization', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
    expires: new Date(0), // January 1, 1970
  });
  response.cookies.set('Authorization', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
    expires: new Date(0), // January 1, 1970
  });
  console.log("Looged")
  return response;
}
