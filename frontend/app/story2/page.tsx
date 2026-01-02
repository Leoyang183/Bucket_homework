"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TokenBalance {
  coinType: string;
  balance: string;
}

interface AddressAsset {
  address: string;
  suiBalance: string;
  tokens: TokenBalance[];
}

export default function Story2Page() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState<AddressAsset | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError("請輸入錢包地址");
      return;
    }

    setLoading(true);
    setError(null);
    setAsset(null);

    try {
      const response = await fetch(
        `http://localhost:5487/checkAddressAsset?address=${encodeURIComponent(address.trim())}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "查詢失敗");
      }

      const data: AddressAsset = await response.json();
      setAsset(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  };

  const otherTokens = useMemo(() => {
    if (!asset) return [];
    return asset.tokens.filter((token) => token.coinType !== "0x2::sui::SUI");
  }, [asset]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8 sm:px-16">
        <div className="w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
              查詢地址資產
            </h1>
            <p className="text-muted-foreground">
              輸入 Sui 錢包地址以查詢其資產資訊
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>查詢表單</CardTitle>
              <CardDescription>請輸入要查詢的錢包地址</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="0x..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={loading}
                    className="font-mono"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "查詢中..." : "查詢"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-destructive text-sm">{error}</div>
              </CardContent>
            </Card>
          )}

          {asset && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>地址資訊</CardTitle>
                  <CardDescription>錢包地址</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm break-all">{asset.address}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SUI 餘額</CardTitle>
                  <CardDescription>主要代幣餘額</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {asset.suiBalance} SUI
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>其他代幣</CardTitle>
                  <CardDescription>
                    {otherTokens.length > 0
                      ? `共 ${otherTokens.length} 種代幣`
                      : "無其他代幣"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {otherTokens.length > 0 ? (
                    <div className="space-y-4">
                      {otherTokens.map((token, index) => (
                        <div
                          key={`${token.coinType}-${index}`}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-muted-foreground">
                              代幣類型
                            </div>
                            <div className="font-mono text-sm break-all">
                              {token.coinType}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-muted-foreground">
                              餘額
                            </div>
                            <div className="text-lg font-semibold">
                              {token.balance}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      此地址沒有其他代幣
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

