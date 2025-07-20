"use client";

import { useProducts } from "@/hooks/useProducts";

export default function SubscriptionList() {
  const { products, error } = useProducts();

  const handlePurchase = (identifier: string) => {
    // TODO: integrate RevenueCat purchase flow
    alert(`Purchase ${identifier} coming soon`);
  };

  if (error) {
    return (
      <p className="text-red-500" role="alert">
        {error}
      </p>
    );
  }

  if (!products) {
    return <p>상품 정보를 불러오는 중...</p>;
  }

  return (
    <ul className="flex flex-col items-center gap-4 w-full">
      {products.map((product) => (
        <li
          key={product.identifier}
          className="bg-gray-800 p-4 rounded w-full max-w-md text-center"
        >
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-sm text-gray-300 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">{product.priceString}</p>
          <button
            onClick={() => handlePurchase(product.identifier)}
            className="bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors"
            aria-label={`${product.title} 구독하기`}
          >
            구독하기
          </button>
        </li>
      ))}
    </ul>
  );
}
