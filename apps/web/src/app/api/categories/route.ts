import { NextResponse } from "next/server";
import { getCategories } from "@eclat/db";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
