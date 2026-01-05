"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface AdminBalance {
  admin: string;
  id: string;
  balance: string;
}

export default function Story3Page() {
  const [data, setData] = useState<AdminBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/getSuiTestnetAdminBalance`);

      if (!response.ok) {
        throw new Error("取得資料失敗");
      }

      const result: AdminBalance = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBalance();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8 sm:px-16">
        <div className="w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold leading-tight text-black dark:text-zinc-50">
              Sui Testnet Admin Balance
            </h1>
          </div>

          {loading && !data && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  載入中...
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-destructive text-sm">{error}</div>
              </CardContent>
            </Card>
          )}

          {data && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Admin</CardTitle>
                  <CardDescription>管理員地址</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm break-all">
                    {data.admin}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ID</CardTitle>
                  <CardDescription>物件 ID</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm break-all">{data.id}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Balance</CardTitle>
                  <CardDescription>餘額</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {data.balance} SUI
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
