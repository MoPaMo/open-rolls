import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, X } from "lucide-react";
import type { StepProps } from "@/types/character";

export function AbilitiesStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const addAbility = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (name && description) {
      updateCharacter({
        abilities: [...character.abilities, { name, description }],
      });
      e.currentTarget.reset();
    }
  };

  const removeAbility = (index: number) => {
    updateCharacter({
      abilities: character.abilities.filter((_, i) => i !== index),
    });
  };
  return (
    <div className="space-y-6">
      <form onSubmit={addAbility} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ability Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g., Second Wind, Sneak Attack, Dark Vision"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe what this ability does..."
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Add Ability
        </Button>
      </form>

      <div className="space-y-4">
        {character.abilities.map((ability, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{ability.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {ability.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAbility(index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
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
