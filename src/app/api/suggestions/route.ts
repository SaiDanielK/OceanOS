import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data", "suggestions.json");

async function readSuggestions() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSuggestions(data: Array<{ id: string; text: string }>) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const suggestions = await readSuggestions();
  return NextResponse.json(suggestions);
}

export async function POST(request: Request) {
  const { text } = await request.json();
  const trimmed = (text || "").trim();

  if (!trimmed) {
    return NextResponse.json({ error: "Empty suggestion" }, { status: 400 });
  }

  const suggestions = await readSuggestions();
  const next = [{ id: Date.now().toString(), text: trimmed }, ...suggestions];

  await writeSuggestions(next);
  return NextResponse.json(next);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const suggestions = await readSuggestions();
  const next = suggestions.filter((suggestion: { id: string }) => suggestion.id !== id);

  await writeSuggestions(next);
  return NextResponse.json(next);
}
