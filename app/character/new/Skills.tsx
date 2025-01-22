import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { StepProps } from "@/types/character";

const SKILLS = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

export function SkillsStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const toggleSkill = (skill: string) => {
    const updatedSkills = character.skills.includes(skill)
      ? character.skills.filter((s) => s !== skill)
      : [...character.skills, skill];
    updateCharacter({ skills: updatedSkills });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {SKILLS.map((skill) => (
          <div key={skill} className="flex items-center space-x-2">
            <Checkbox
              id={skill}
              checked={character.skills.includes(skill)}
              onCheckedChange={() => toggleSkill(skill)}
            />
            <Label htmlFor={skill}>{skill}</Label>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Complete
        </Button>
      </div>
    </div>
  );
}
