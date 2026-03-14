import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>https://jssolar.kr/blog/${post.slug}</link>
      <guid isPermaLink="true">https://jssolar.kr/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>js솔라 블로그</title>
    <description>태양광 EPC·O&M 전문가가 직접 쓰는 현장 실무 블로그</description>
    <link>https://jssolar.kr/blog</link>
    <atom:link href="https://jssolar.kr/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
