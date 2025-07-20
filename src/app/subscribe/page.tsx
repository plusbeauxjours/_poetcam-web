"use client";

import SubscriptionList from "@/components/SubscriptionList";
import FontCycleText from "@/components/FontCycleText";
import Link from "next/link";

export default function SubscribePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 gap-6">
      <h1 className="text-2xl">
        <FontCycleText text="프리미엄 구독" />
      </h1>
      <SubscriptionList />
      <Link href="/" className="text-sm underline text-gray-300">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
