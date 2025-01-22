import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wand2 } from "lucide-react";
interface SpellCardProps {
  name: string;
  level: number;
  components: string[];
  description: string;
}
export function SpellCard({
  name,
  level,
  components,
  description,
}: SpellCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            {name}
          </CardTitle>
          <span className="text-sm text-muted-foreground">Level {level}</span>
        </div>
        <CardDescription>Components: {components.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
