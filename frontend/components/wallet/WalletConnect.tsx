"use client";

import { useCurrentAccount, useWallets, useConnectWallet } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function WalletConnect() {
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);

  useEffect(() => {
    // 檢查可用的錢包
    const walletNames = wallets
      .filter((wallet) => wallet.name)
      .map((wallet) => wallet.name);
    setAvailableWallets(walletNames);
  }, [wallets]);

  const handleConnect = (walletName: string) => {
    const wallet = wallets.find((w) => w.name === walletName);
    if (wallet) {
      connect({ wallet });
    }
  };

  if (currentAccount) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {availableWallets.length > 0 ? (
        availableWallets.map((walletName) => (
          <Button
            key={walletName}
            onClick={() => handleConnect(walletName)}
            variant="default"
            className="w-full"
          >
            連接 {walletName}
          </Button>
        ))
      ) : (
        <div className="text-sm text-muted-foreground">
          請安裝 Slush Wallet 或 Binance Wallet
        </div>
      )}
    </div>
  );
}

