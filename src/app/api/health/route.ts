/* Preview-platform health ping only. The site itself is fully static. */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ ok: true });
}
