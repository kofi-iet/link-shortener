import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

interface Props { params: Promise<{ slug: string }>; }

export default async function RedirectPage({ params }: Props) {
  const { slug } = await params;
  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) notFound();
  prisma.link.update({ where: { id: link.id }, data: { clicks: { increment: 1 } } }).catch(() => {});
  redirect(link.url);
}
