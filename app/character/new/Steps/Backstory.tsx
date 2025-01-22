import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StepProps } from "@/types/character";
export function BackstoryStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="backstory">Character Backstory</Label>
        <Textarea
          id="backstory"
          value={character.backstory}
          onChange={(e) => updateCharacter({ backstory: e.target.value })}
          placeholder="Write your character's backstory here..."
          className="min-h-[200px]"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!character.backstory}
          className="w-full"
        >
          Complete
        </Button>
      </div>
    </div>
  );
}
