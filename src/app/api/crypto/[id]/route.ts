import { NextRequest, NextResponse } from "next/server";
import Crypto from "@/models/crypto";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cryptos = await Crypto.find({ geko_id: params.id })
    .sort({ createdAt: -1 })
    .limit(20);
  return NextResponse.json(cryptos);
}
