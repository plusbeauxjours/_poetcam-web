import { SubscriptionProduct } from "@/types";

/**
 * Fetch subscription products from the API
 */
export async function getProducts(): Promise<SubscriptionProduct[]> {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products as SubscriptionProduct[];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}
