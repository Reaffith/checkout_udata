import { NextResponse } from "next/server";

const promoCodes: Record<string, number> = {
  SAVE10: 10,
  SUMMER20: 20,
  WELCOME5: 5,
  SUPERBONUS35: 35
};

export async function POST(request: Request) {
  const body = await request.json();
  const { promocode } = body;

  if (!promocode) {
    return NextResponse.json({ discountPercent: 0 });
  }

  const discount = promoCodes[promocode.toUpperCase()] ?? 0;

  return NextResponse.json({ discountPercent: discount });
}
