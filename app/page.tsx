import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>OpenRolls</h1>
      <p>Open Source DnD Character Creator</p>
      <Link href={"/character/new"}>
        <Button>Create your next character</Button>
      </Link>
    </div>
  );
}
