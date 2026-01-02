"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { WalletInfo } from "@/components/wallet/WalletInfo";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { isValidSuiAddress } from "@mysten/sui/utils";

const TESTNET_EXPLORER_URL = "https://suiscan.xyz/testnet/tx";

export default function Story4Page() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute, isPending, isSuccess, data } = useSignAndExecuteTransaction();
  const [targetAddress, setTargetAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSendTransaction = async () => {
    setError(null);

    if (!currentAccount) {
      setError("請先連接錢包");
      return;
    }

    if (!targetAddress.trim()) {
      setError("請輸入目標地址");
      return;
    }

    if (!isValidSuiAddress(targetAddress.trim())) {
      setError("無效的 Sui 地址格式");
      return;
    }

    if (!amount.trim()) {
      setError("請輸入轉帳金額");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("請輸入有效的轉帳金額（必須大於 0）");
      return;
    }

    try {
      // 創建交易
      const tx = new Transaction();
      
      const amountInMist = Math.floor(amountValue * 1_000_000_000);
      
      const [coin] = tx.splitCoins(tx.gas, [amountInMist]);
      tx.transferObjects([coin], targetAddress.trim());

      signAndExecute(
        {
          transaction: tx,
          chain: "sui:testnet",
        },
        {
          onError: (err) => {
            setError(err.message || "交易失敗");
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生未知錯誤");
    }
  };

  const transactionHash = data?.digest;
  const explorerUrl = transactionHash 
    ? `${TESTNET_EXPLORER_URL}/${transactionHash}`
    : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8 sm:px-16">
        <div className="w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
              發送交易至特定帳戶 (Testnet)
            </h1>
            <p className="text-muted-foreground">
              使用 Sui SDK 發送 Sui 到指定地址
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <WalletInfo />
              <WalletConnect />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>發送交易</CardTitle>
                <CardDescription>輸入目標地址和轉帳金額</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="target-address" className="text-sm font-medium">
                    目標地址
                  </label>
                  <Input
                    id="target-address"
                    type="text"
                    placeholder="0x..."
                    value={targetAddress}
                    onChange={(e) => setTargetAddress(e.target.value)}
                    disabled={!currentAccount || isPending}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    轉帳金額 (SUI)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    step="0.000000001"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!currentAccount || isPending}
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleSendTransaction}
                  disabled={!currentAccount || isPending}
                  className="w-full"
                >
                  {isPending ? "發送中..." : "發送交易"}
                </Button>

                {isSuccess && transactionHash && (
                  <div className="space-y-3 rounded-md border bg-muted/50 p-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        transaction hash
                      </div>
                      <div className="font-mono text-sm break-all text-foreground">
                        {transactionHash}
                      </div>
                    </div>
                    {explorerUrl && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(explorerUrl, "_blank")}
                      >
                        在 Sui Explorer 查看
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

