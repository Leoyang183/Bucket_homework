'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    const handleClick = (href: string) => {
        router.push(href)
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div onClick={() => handleClick('/story1')} className="cursor-pointer">Story 1</div>
        <div onClick={() => handleClick('/story2')} className="cursor-pointer">Story 2</div>
      </main>
    </div>
  );
}