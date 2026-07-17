import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { FEATURED_PROJECT } from "@/lib/portfolio-data";

const schema = z.object({
  title: z.string().min(2, "Title needs at least 2 characters").max(80),
  category: z.string().min(1).max(40),
  year: z.string().min(2).max(8),
  blurb: z.string().min(10, "Tell me a bit more (10+ chars)").max(180),
  description: z.string().min(20, "Description needs 20+ characters").max(1500),
  tech: z.string().min(2).max(300),
  highlights: z.string().max(800).optional().default(""),
  demoUrl: z.string().max(300).optional().default(""),
  repoUrl: z.string().max(300).optional().default(""),
  accent: z.string().max(60).optional().default("oklch(0.55 0.1 190)"),
});

async function ensureSeed() {
  try {
    const count = await db.project.count();
    if (count > 0) return;
    await db.project.create({
      data: {
        title: FEATURED_PROJECT.title,
        category: FEATURED_PROJECT.category,
        year: FEATURED_PROJECT.year,
        blurb: FEATURED_PROJECT.blurb,
        description: FEATURED_PROJECT.description,
        tech: FEATURED_PROJECT.tech.join("|"),
        highlights: FEATURED_PROJECT.highlights.join("\n"),
        demoUrl: FEATURED_PROJECT.demo,
        repoUrl: FEATURED_PROJECT.repo,
        accent: FEATURED_PROJECT.accent,
        thumbnail: FEATURED_PROJECT.thumbnail,
        featured: true,
        order: 0,
      },
    });
  } catch (err) {
    console.error("[projects] seed error:", err);
  }
}

export async function GET() {
  try {
    await ensureSeed();
    const rows = await db.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
    const projects = rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      year: r.year,
      blurb: r.blurb,
      description: r.description,
      tech: r.tech.split("|").filter(Boolean),
      highlights: r.highlights.split("\n").filter(Boolean),
      demoUrl: r.demoUrl,
      repoUrl: r.repoUrl,
      accent: r.accent,
      thumbnail: r.thumbnail,
      featured: r.featured,
      createdAt: r.createdAt,
    }));
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[projects] GET error:", err);
    return NextResponse.json(
      { projects: [], demo: true, error: "DB unavailable" },
      { status: 200 }
    );
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
          blurb: d.blurb,
          description: d.description,
          tech: d.tech,
          highlights: d.highlights,
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
        {
          ok: true,
          demo: true,
          message: "Got it (demo mode — DB not connected). It'd normally be saved to SQLite.",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("[projects] unexpected:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
