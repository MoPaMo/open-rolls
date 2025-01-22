import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepProps } from "@/types/character";

const LANGUAGES = [
  "Common",
  "Elvish",
  "Dwarvish",
  "Halfling",
  "Draconic",
  "Infernal",
];
const TOOLS = [
  "Thieves' Tools",
  "Herbalism Kit",
  "Smith's Tools",
  "Disguise Kit",
];

export function ProficienciesStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const addLanguage = (language: string) => {
    if (!character.proficiencies.languages.includes(language)) {
      updateCharacter({
        proficiencies: {
          ...character.proficiencies,
          languages: [...character.proficiencies.languages, language],
        },
      });
    }
  };

  const addTool = (tool: string) => {
    if (!character.proficiencies.tools.includes(tool)) {
      updateCharacter({
        proficiencies: {
          ...character.proficiencies,
          tools: [...character.proficiencies.tools, tool],
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Languages</Label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((language) => (
            <Button
              key={language}
              variant={
                character.proficiencies.languages.includes(language)
                  ? "default"
                  : "outline"
              }
              onClick={() => addLanguage(language)}
              type="button"
            >
              {language}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tools</Label>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <Button
              key={tool}
              variant={
                character.proficiencies.tools.includes(tool)
                  ? "default"
                  : "outline"
              }
              onClick={() => addTool(tool)}
              type="button"
            >
              {tool}
            </Button>
          ))}
        </div>
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
