import { createClient } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Create a direct Sanity client for signup (no session authentication)
const signupSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_STUDIO_TOKEN,
  apiVersion: '2021-10-21',
  perspective: 'published',
  stega: false,
});

export async function POST(req: NextRequest) {
  try {
    console.log('Signup request received');

    // Check if required environment variables are set
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.error('Missing SANITY_PROJECT_ID');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_STUDIO_TOKEN) {
      console.error('Missing Sanity token');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { email, password, name } = await req.json();

    console.log('Signup data:', { email, name, hasPassword: !!password });

    if (!email || !password || !name) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await signupSanityClient.fetch(
      "*[_type == 'user' && email == $email][0]",
      { email }
    );

    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    console.log('Creating user...');
    const newUser = {
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      image: '',
      isAdmin: false,
    };

    const createdUser = await signupSanityClient.create(newUser);
    console.log('User created successfully:', createdUser._id);

    return NextResponse.json({ success: true, userId: createdUser._id });
  } catch (error) {
    console.error('Signup error:', error);

    // Check if it's a Sanity permission error
    if (error instanceof Error && error.message.includes('permission')) {
      return NextResponse.json(
        { error: 'Server configuration error - check Sanity permissions' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to sign up',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
