import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, category: true, published: true, createdAt: true },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();

  // Generate slug from title if not provided
  const slug = data.slug || data.title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      content: data.content,
      category: data.category,
      tags: data.tags || [],
      thumbnail: data.thumbnail || null,
      published: data.published || false,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
