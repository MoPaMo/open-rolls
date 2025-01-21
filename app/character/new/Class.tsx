import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StepProps } from "@/types/character";

const CLASSES = ["Fighter", "Wizard", "Rogue", "Cleric", "Ranger", "Paladin"];

export function ClassStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Class</Label>
        <Select
          value={character.class}
          onValueChange={(value) => updateCharacter({ class: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {CLASSES.map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button onClick={onNext} disabled={!character.class} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}
