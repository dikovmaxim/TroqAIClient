import { AddProject, Login } from '@/utils/Api';
import { setToken } from '@/utils/Token';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, description } = await request.json();

    if (!name || !description) return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });

    let projectData = await AddProject(name, description);
    return NextResponse.json({ message: 'Project created successfully', data: projectData }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}