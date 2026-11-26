import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

const schema = z.object({ url: z.string().url("URL tidak valid") });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Input tidak valid" }, { status: 400 });
    }
    const { url } = parsed.data;
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Hanya URL http/https" }, { status: 400 });
    }
    let slug = nanoid(7);
    let existing = await prisma.link.findUnique({ where: { slug } });
    while (existing) { slug = nanoid(7); existing = await prisma.link.findUnique({ where: { slug } }); }
    const link = await prisma.link.create({ data: { url, slug } });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.json({ shortUrl: `${baseUrl}/${link.slug}`, slug: link.slug });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat link pendek" }, { status: 500 });
  }
}
