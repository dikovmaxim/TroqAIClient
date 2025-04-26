import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    // Perform validation or database checks here
    if (email === 'test@example.com' && password === 'secret') {
      return NextResponse.json({ token: 'fake-jwt-token' });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}