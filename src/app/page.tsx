"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/lib/ui/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="md:container md:mx-auto pt-24">
      <h1 className="text-2xl text-center font-bold">
        Welcome to Expenses Tracker App
      </h1>
      <div className="pt-8 mx-auto max-w-xl flex justify-center grid gap-4 grid-cols-2">
        <Button variant="primary" onClick={() => router.push("/signin")}>
          Sign In
        </Button>
        <Button variant="secondary" onClick={() => router.push("/signup")}>
          Sign Up
        </Button>
      </div>
    </main>
  );
}
