import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email").max(120),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(120),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: firstError?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    try {
      const record = await db.contactMessage.create({
        data: { name, email, subject, message },
        select: { id: true, createdAt: true },
      });

      return NextResponse.json({
        ok: true,
        id: record.id,
        createdAt: record.createdAt,
        message: "Thanks! Your message landed in my inbox — I'll reply within 1-2 days.",
      });
    } catch (dbErr) {
      // If the database isn't available (e.g. not pushed yet), fail soft so the
      // demo still works. Log and return a graceful success-shaped response.
      console.error("[contact] db error:", dbErr);
      return NextResponse.json(
        {
          ok: true,
          demo: true,
          message:
            "Message received (demo mode — Prisma DB not connected). I'd normally persist this to Postgres.",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.contactMessage.count();
    const unread = await db.contactMessage.count({ where: { read: false } });
    return NextResponse.json({ total: count, unread });
  } catch {
    return NextResponse.json({ total: 0, unread: 0, demo: true });
  }
}
