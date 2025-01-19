import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { StepProps } from "@/types/character";

export function AlignmentStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Ethical Alignment</Label>
          <RadioGroup
            value={character.alignment.ethic?.toString()}
            onValueChange={(value) =>
              updateCharacter({
                alignment: {
                  ...character.alignment,
                  ethic: parseInt(value) as -1 | 0 | 1,
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="lawful" />
              <Label htmlFor="lawful">Lawful</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="neutral-ethic" />
              <Label htmlFor="neutral-ethic">Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="-1" id="chaotic" />
              <Label htmlFor="chaotic">Chaotic</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Moral Alignment</Label>
          <RadioGroup
            value={character.alignment.moral?.toString()}
            onValueChange={(value) =>
              updateCharacter({
                alignment: {
                  ...character.alignment,
                  moral: parseInt(value) as -1 | 0 | 1,
                },
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="good" />
              <Label htmlFor="good">Good</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="neutral-moral" />
              <Label htmlFor="neutral-moral">Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="-1" id="evil" />
              <Label htmlFor="evil">Evil</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={
            typeof character.alignment.ethic !== "number" ||
            typeof character.alignment.moral !== "number"
          }
          className="w-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
