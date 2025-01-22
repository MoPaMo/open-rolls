import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StepProps } from "@/types/character";

const SPELL_COMPONENTS = ["V", "S", "M"];

export function SpellsStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const addSpell = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const level = parseInt(formData.get("level") as string);
    const description = formData.get("description") as string;
    const components = SPELL_COMPONENTS.filter((c) => formData.get(c) === "on");

    if (name && level >= 0) {
      updateCharacter({
        spells: [...character.spells, { name, level, components, description }],
      });
      e.currentTarget.reset();
    }
  };

  const removeSpell = (index: number) => {
    updateCharacter({
      spells: character.spells.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addSpell} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Spell Name</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Spell Level</Label>
          <Input
            id="level"
            name="level"
            type="number"
            min="0"
            max="9"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Components</Label>
          <div className="flex gap-4">
            {SPELL_COMPONENTS.map((component) => (
              <div key={component} className="flex items-center gap-2">
                <input type="checkbox" id={component} name={component} />
                <Label htmlFor={component}>{component}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
        </div>

        <Button type="submit">Add Spell</Button>
      </form>

      <div className="space-y-2">
        {character.spells.map((spell, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <div className="font-bold">{spell.name}</div>
              <div className="text-sm text-muted-foreground">
                Level {spell.level} - Components: {spell.components.join(", ")}
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeSpell(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}
