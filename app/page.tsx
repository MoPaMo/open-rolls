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
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Simple and intuitive character creation</li>
            <li>Save and load characters</li>
            <li>Export ch aracters to PDF</li>
            <li>Open source and free to use</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
