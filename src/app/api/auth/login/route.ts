import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: '아이디와 비밀번호를 입력하세요.' }, { status: 400 });
    }

    // Query portal's User table directly
    const users = await prisma.$queryRaw<
      { username: string; password: string; role: string }[]
    >`SELECT username, password, role FROM "User" WHERE username = ${username} AND role = 'ADMIN'`;

    const user = users[0];
    if (!user || !user.password) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 틀렸습니다.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 틀렸습니다.' }, { status: 401 });
    }

    const token = await createToken(user.username);

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: '로그인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
