import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { prisma } from './prisma';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  thumbnail?: string | null;
  readingTime: number;
  content: string;
}

// DB posts (published only)
async function getDbPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.createdAt.toISOString().split('T')[0],
      updated: p.updatedAt.toISOString().split('T')[0],
      category: p.category,
      tags: p.tags,
      thumbnail: p.thumbnail,
      readingTime: Math.ceil(readingTime(p.content).minutes),
      content: p.content,
    }));
  } catch {
    return [];
  }
}

// File-based posts (legacy)
function getFilePosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      updated: data.updated,
      category: data.category || '',
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      readingTime: data.readingTime || Math.ceil(stats.minutes),
      content,
    };
  });
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const [dbPosts, filePosts] = await Promise.all([getDbPosts(), Promise.resolve(getFilePosts())]);
  const all = [...dbPosts, ...filePosts];
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // Check DB first
  try {
    const dbPost = await prisma.blogPost.findUnique({ where: { slug } });
    if (dbPost && dbPost.published) {
      return {
        slug: dbPost.slug,
        title: dbPost.title,
        description: dbPost.description,
        date: dbPost.createdAt.toISOString().split('T')[0],
        updated: dbPost.updatedAt.toISOString().split('T')[0],
        category: dbPost.category,
        tags: dbPost.tags,
        thumbnail: dbPost.thumbnail,
        readingTime: Math.ceil(readingTime(dbPost.content).minutes),
        content: dbPost.content,
      };
    }
  } catch {
    // DB not available, fall through to file
  }

  // Check file
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    updated: data.updated,
    category: data.category || '',
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    readingTime: data.readingTime || Math.ceil(stats.minutes),
    content,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

export function getCategories(): string[] {
  return ['전체', '기술 해설', '시공 사례', '규정 정리', 'O&M'];
}
