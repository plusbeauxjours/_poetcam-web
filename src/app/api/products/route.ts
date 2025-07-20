import { NextResponse } from "next/server";

let cachedProducts: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  if (cachedProducts && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return NextResponse.json({ products: cachedProducts });
  }

  const apiKey = process.env.REVENUECAT_API_KEY;
  const projectId = process.env.REVENUECAT_PROJECT_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json(
      { error: "RevenueCat API not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.revenuecat.com/v1/projects/${projectId}/products`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RevenueCat API Error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    const data = await response.json();
    cachedProducts = data.products ?? [];
    cacheTimestamp = Date.now();

    return NextResponse.json({ products: cachedProducts });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
