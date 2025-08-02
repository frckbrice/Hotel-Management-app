import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, metrics, timestamp } = body;

    // Validate the request
    if (!url || !metrics || !timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Log performance metrics (in production, you'd send this to your analytics service)
    console.log("Performance Metrics:", {
      url,
      metrics,
      timestamp: new Date(timestamp).toISOString(),
    });

    // Here you would typically:
    // 1. Send to your analytics service (Google Analytics, Mixpanel, etc.)
    // 2. Store in your database
    // 3. Send alerts if metrics are poor
    // 4. Generate reports

    // Example: Check if metrics are within acceptable ranges
    const alerts = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      alerts.push(`LCP is ${metrics.lcp}ms (should be < 2500ms)`);
    }

    if (metrics.fid && metrics.fid > 100) {
      alerts.push(`FID is ${metrics.fid}ms (should be < 100ms)`);
    }

    if (metrics.cls && metrics.cls > 0.1) {
      alerts.push(`CLS is ${metrics.cls} (should be < 0.1)`);
    }

    if (alerts.length > 0) {
      console.warn("Performance alerts:", alerts);
      // Send alerts to your monitoring service
    }

    return NextResponse.json(
      {
        success: true,
        message: "Performance metrics recorded",
        alerts: alerts.length > 0 ? alerts : undefined,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing performance metrics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Performance metrics endpoint is active",
      endpoints: {
        POST: "Submit performance metrics",
        GET: "Check endpoint status",
      },
    },
    { status: 200 },
  );
}
