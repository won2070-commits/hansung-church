import { PostPage, postParams } from "@/components/Sections";
import { board, niceTitle, BOARDS } from "@/lib/data";
export const dynamicParams = false;
export const generateStaticParams = () => postParams("life");
export async function generateMetadata({ params }: { params: Promise<{ slug: string; seq: string }> }) {
  const { slug, seq } = await params;
  const m = BOARDS.find((b) => b.slug === slug)!;
  const p = board(slug).posts.find((x) => String(x.seq) === seq);
  return { title: p ? niceTitle(p, m).title + " · " + m.name : m.name };
}
export default async function Page({ params }: { params: Promise<{ slug: string; seq: string }> }) {
  const { slug, seq } = await params;
  return <PostPage section="life" slug={slug} seq={seq} />;
}
