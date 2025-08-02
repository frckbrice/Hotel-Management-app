import { NextResponse } from "next/server";

export async function GET() {
  const envCheck = {
    hasSanityProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    hasSanityDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
    hasSanityWriteToken: !!process.env.SANITY_WRITE_TOKEN,
    hasSanityStudioToken: !!process.env.SANITY_STUDIO_TOKEN,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
  };

  return NextResponse.json({
    message: "Environment check",
    env: envCheck,
    timestamp: new Date().toISOString(),
  });
}
