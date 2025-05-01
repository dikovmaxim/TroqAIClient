import { AddProject, DeleteProject, Login } from '@/utils/Api';
import { setToken } from '@/utils/Token';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) return NextResponse.json({ error: 'Id is required' }, { status: 400 });

    await DeleteProject(id);

    return NextResponse.json({ message: 'Project removed successfully'}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}