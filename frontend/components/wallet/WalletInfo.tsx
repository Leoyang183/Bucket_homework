"use client";

import { useCurrentAccount, useSuiClientQuery, useDisconnectWallet } from "@mysten/dapp-kit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@mysten/sui/utils";

export function WalletInfo() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const { data: balance } = useSuiClientQuery(
    "getBalance",
    {
      owner: currentAccount?.address || "",
    },
    {
      enabled: !!currentAccount?.address,
      refetchInterval: 5000, // 每 5 秒更新一次餘額
    }
  );

  if (!currentAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>錢包資訊</CardTitle>
          <CardDescription>尚未連接錢包</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">錢包地址</div>
            <div className="font-mono text-sm text-muted-foreground">-</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">SUI 餘額</div>
            <div className="font-mono text-sm text-muted-foreground">-</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formattedAddress = formatAddress(currentAccount.address);
  const mist = BigInt(balance?.totalBalance || 0);
  const suiInt = mist / 1_000_000_000n;
  const suiDecimal = mist % 1_000_000_000n;
  const suiBalance = `${suiInt}.${suiDecimal.toString().padStart(9, '0')}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>錢包資訊</CardTitle>
        <CardDescription>已連接的錢包帳戶資料</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">錢包地址</div>
          <div className="font-mono text-sm break-all">{formattedAddress}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">SUI 餘額</div>
          <div className="text-2xl font-semibold">{suiBalance} SUI</div>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          className="w-full"
        >
          斷開連接
        </Button>
      </CardContent>
    </Card>
  );
}

