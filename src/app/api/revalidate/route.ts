import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Verify the webhook token for security
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  const webhookToken = process.env.PRISMIC_WEBHOOK_TOKEN;

  if (!webhookToken || token !== webhookToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate Prismic cache
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 },
    );
  }
}
