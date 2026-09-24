// =====================================================================
// /api/health — Static health-check endpoint
// =====================================================================
// This is the ONLY dynamic endpoint in the entire site.
// It returns a simple static JSON response and makes ZERO calls to any
// database, external service, or third-party API.
//
// Purpose: uptime monitoring and sandbox preview verification.
// =====================================================================

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "hartwell-co",
      mode: "static-frontend",
      database: "none",
      backend: "none",
      storage: "localStorage (client-side)",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
