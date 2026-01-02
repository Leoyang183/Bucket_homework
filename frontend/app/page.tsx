"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const handleClick = (href: string) => {
    router.push(href);
  };

  const stories = [
    { href: "/story1", title: "Story 1-1" },
    { href: "/story2", title: "Story 1-2" },
    { href: "/story3", title: "Story 3" },
    { href: "/story4", title: "Story 4" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {stories.map((story) => (
            <Card
              key={story.href}
              className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
              onClick={() => handleClick(story.href)}
            >
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(story.href);
                  }}
                >
                  進入
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
