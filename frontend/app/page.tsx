"use client";

import { WalletConnect } from "@/components/wallet/WalletConnect";
import { WalletInfo } from "@/components/wallet/WalletInfo";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-8 sm:px-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
              Sui Web3 homework
            </h1>
          </div>
          <div className="space-y-4">
            <WalletConnect />
            <WalletInfo />
          </div>
        </div>
      </main>
    </div>
  );
}
