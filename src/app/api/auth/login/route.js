import { Login } from '@/utils/Api';
import { setToken } from '@/utils/Token';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });

    const loginResult = await Login(email, password);
    if (loginResult && loginResult.data) {
        await setToken(loginResult.data.token);
        return NextResponse.json(loginResult.data);
    } else {
      return NextResponse.json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}