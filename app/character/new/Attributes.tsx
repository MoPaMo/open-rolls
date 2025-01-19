import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepProps } from "@/types/character";

const ATTRIBUTES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export function AttributesStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const handleAttributeChange = (attribute: string, value: string) => {
    const numValue = parseInt(value) || 0;
    updateCharacter({
      attributes: {
        ...character.attributes,
        [attribute]: Math.min(20, Math.max(1, numValue)),
      },
    });
  };

  const isValid = ATTRIBUTES.every(
    (attr) =>
      character.attributes[attr as keyof typeof character.attributes] > 0
  );

  return (
    <div className="space-y-4">
      {ATTRIBUTES.map((attribute) => (
        <div key={attribute} className="space-y-2">
          <Label htmlFor={attribute} className="capitalize">
            {attribute}
          </Label>
          <Input
            id={attribute}
            type="number"
            min="1"
            max="20"
            value={
              character.attributes[
                attribute as keyof typeof character.attributes
              ]
            }
            onChange={(e) => handleAttributeChange(attribute, e.target.value)}
          />
        </div>
      ))}

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}
