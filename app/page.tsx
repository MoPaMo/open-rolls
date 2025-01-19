import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-semibold">OpenRolls</h1>
      <p className="text-lg text-gray-600">Open Source DnD Character Creator</p>
      <Link href="/character/new">
        <Button className="mt-4 text-2xl">Create Your Next Character</Button>
      </Link>
    </div>
  );
}
