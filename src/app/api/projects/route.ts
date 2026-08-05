import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { PROJECT_SEEDS } from "@/lib/portfolio-data";

const schema = z.object({
  title: z.string().min(2, "Title needs at least 2 characters").max(80),
  category: z.string().min(1).max(40),
  year: z.string().min(2).max(8),
  headline: z.string().max(180).optional().default(""),
  problem: z.string().max(800).optional().default(""),
  features: z.string().max(800).optional().default(""),
  role: z.string().max(800).optional().default(""),
  challenges: z.string().max(800).optional().default(""),
  tech: z.string().min(2).max(300),
  demoUrl: z.string().max(300).optional().default(""),
  repoUrl: z.string().max(300).optional().default(""),
  accent: z.string().max(60).optional().default("oklch(0.55 0.1 190)"),
});

async function ensureSeed() {
  try {
    const count = await db.project.count();
    if (count > 0) return;
    for (const s of PROJECT_SEEDS) {
      await db.project.create({
        data: {
          title: s.title,
          category: s.category,
          year: s.year,
          headline: s.headline,
          problem: s.problem,
          features: s.features.join("\n"),
          role: s.role,
          challenges: s.challenges.join("\n"),
          tech: s.tech.join("|"),
          demoUrl: s.demoUrl,
          repoUrl: s.repoUrl,
          accent: s.accent,
          thumbnail: s.thumbnail,
          featured: s.featured,
          order: s.order,
        },
      });
    }
  } catch (err) {
    console.error("[projects] seed error:", err);
  }
}

function serialize(r: {
  id: string; title: string; category: string; year: string;
  headline: string; problem: string; features: string; role: string;
  challenges: string; tech: string; demoUrl: string; repoUrl: string;
  accent: string; thumbnail: string; featured: boolean; createdAt: Date;
}) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    year: r.year,
    headline: r.headline,
    problem: r.problem,
    features: r.features.split("\n").filter(Boolean),
    role: r.role,
    challenges: r.challenges.split("\n").filter(Boolean),
    tech: r.tech.split("|").filter(Boolean),
    demoUrl: r.demoUrl,
    repoUrl: r.repoUrl,
    accent: r.accent,
    thumbnail: r.thumbnail,
    featured: r.featured,
    createdAt: r.createdAt,
  };
}

export async function GET() {
  try {
    await ensureSeed();
    const rows = await db.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
    const projects = rows.map(serialize);
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[projects] GET error:", err);
    return NextResponse.json({ projects: [], demo: true, error: "DB unavailable" }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    const d = parsed.data;

    try {
      const order = await db.project.count();
      const record = await db.project.create({
        data: {
          title: d.title,
          category: d.category,
          year: d.year,
          headline: d.headline,
          problem: d.problem,
          features: d.features,
          role: d.role,
          challenges: d.challenges,
          tech: d.tech,
          demoUrl: d.demoUrl,
          repoUrl: d.repoUrl,
          accent: d.accent,
          featured: false,
          order,
        },
      });
      return NextResponse.json({
        ok: true,
        id: record.id,
        message: "Project saved — it's live on the site now.",
      });
    } catch (dbErr) {
      console.error("[projects] db error:", dbErr);
      return NextResponse.json(
        { ok: true, demo: true, message: "Got it (demo mode — DB not connected). It'd normally be saved to SQLite." },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("[projects] unexpected:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
