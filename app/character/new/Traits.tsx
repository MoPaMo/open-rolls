import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StepProps } from "@/types/character";

const RACES = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Tiefling"];

export function TraitStep({ character, updateCharacter, onNext }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Character Name</Label>
        <Input
          id="name"
          value={character.name}
          onChange={(e) => updateCharacter({ name: e.target.value })}
          placeholder="Enter character name"
        />
      </div>

      <div className="space-y-2">
        <Label>Race</Label>
        <Select
          value={character.race}
          onValueChange={(value) => updateCharacter({ race: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a race" />
          </SelectTrigger>
          <SelectContent>
            {RACES.map((race) => (
              <SelectItem key={race} value={race}>
                {race}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onNext}
        disabled={!character.name || !character.race}
        className="w-full"
      >
        Next
      </Button>
    </div>
  );
}
