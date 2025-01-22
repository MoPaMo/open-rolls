import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { StepProps } from "@/types/character";

const BACKGROUNDS = [
  "Acolyte",
  "Criminal",
  "Folk Hero",
  "Noble",
  "Sage",
  "Soldier",
];

export function BackgroundStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Background</Label>
        <Select
          value={character.background}
          onValueChange={(value) => updateCharacter({ background: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a background" />
          </SelectTrigger>
          <SelectContent>
            {BACKGROUNDS.map((bg) => (
              <SelectItem key={bg} value={bg}>
                {bg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!character.background}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
