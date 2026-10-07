import { BoardPage, hubParams } from "@/components/Sections";
import { BOARDS } from "@/lib/data";
export const dynamicParams = false;
export const generateStaticParams = () => hubParams("life");
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: BOARDS.find((b) => b.slug === slug)?.name };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BoardPage section="life" slug={slug} />;
}
