import { useEffect, useState } from "react";
import { SubscriptionProduct } from "@/types";
import { getProducts } from "@/lib/getProducts";
import { ERROR_MESSAGES } from "@/constants";

/**
 * Hook to load subscription products with session storage caching
 */
export function useProducts() {
  const [products, setProducts] = useState<SubscriptionProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = "subscriptionProducts";
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setProducts(JSON.parse(cached));
      return;
    }

    getProducts()
      .then((items) => {
        setProducts(items);
        sessionStorage.setItem(cacheKey, JSON.stringify(items));
      })
      .catch((err) => {
        console.error(err);
        setError(ERROR_MESSAGES.subscription.fetchFailed);
      });
  }, []);

  return { products, error };
}
