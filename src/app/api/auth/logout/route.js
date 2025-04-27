import { Login } from '@/utils/Api';
import { removeToken, setToken } from '@/utils/Token';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {

    await removeToken();

    return NextResponse.json({ message: 'Logged out successfully' });



  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}