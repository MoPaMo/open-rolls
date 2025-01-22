import { cn } from "@/lib/utils";
interface AbilityScoreProps {
  name: string;
  score: number;
  abbreviation: string;
}
export function AbilityScore({ name, score, abbreviation }: AbilityScoreProps) {
  const modifier = Math.floor((score - 10) / 2);
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : modifier.toString();
  return (
    <div className="relative flex flex-col items-center p-4 border rounded-lg">
      <div className="text-sm font-medium text-muted-foreground uppercase">
        {name}
      </div>
      <div className="text-2xl font-bold">{score}</div>
      <div className="absolute -bottom-3 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
        {modifierDisplay}
      </div>
      <div className="sr-only">{abbreviation}</div>
    </div>
  );
}
