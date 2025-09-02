
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 401 });
    }

    if (user.status !== 1) {
      return NextResponse.json({ error: 'User is not active' }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    console.log('secret code', process.env.JWT_SECRET)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default_secret_jayant', // fallback in dev
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // Extract role names from UserRole relation
    const roles = await prisma.role.findUnique({where: {id : user.roleId}});

    const data = {
      email: user.email,
      name: user.name,
      roles: roles.name,
    };

    const response = NextResponse.json({ message: 'Login successful', data });

    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: parseInt(process.env.JWT_EXPIRES_IN_SEC || '86400'), // fallback: 1 day
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

