import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-semibold">OpenRolls</h1>
      <p className="text-lg text-gray-600">Open Source DnD Character Creator</p>
      <Link href="/character/new">
        <Button className="mt-4 text-2xl">Create Your Next Character</Button>
      </Link>

      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Work In Progress!</h2>
          <p>
            Please do not build any characters you want to keep. This is a work in progress and data may be lost at any time.
          </p>
        </div>
      </Card>
    </div>
  );
}
