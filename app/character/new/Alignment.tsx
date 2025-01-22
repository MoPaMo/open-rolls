"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { StepProps } from "@/types/character";
import { cn } from "@/lib/utils";

const alignments = {
  moral: [
    { value: 1, label: "Good" },
    { value: 0, label: "Neutral" },
    { value: -1, label: "Evil" },
  ],
  ethic: [
    { value: 1, label: "Lawful" },
    { value: 0, label: "Neutral" },
    { value: -1, label: "Chaotic" },
  ],
} as const;

const alignmentDescriptions: Record<string, string> = {
  "1,1": "Lawful Good",
  "1,0": "Lawful Neutral",
  "1,-1": "Lawful Evil",
  "0,1": "Neutral Good ",
  "0,0": "True Neutral ",
  "0,-1": "Neutral Evil ",
  "-1,1": "Chaotic Good ",
  "-1,0": "Chaotic Neutral  ",
  "-1,-1": "Chaotic Evil ",
};

export function AlignmentStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const selectedKey = `${character.alignment.ethic},${character.alignment.moral}`;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <Label className="text-lg font-semibold">Choose Your Alignment</Label>
          <p className="text-sm text-muted-foreground">
            This will help you steer your character
          </p>
        </div>

        <div className="relative">
          <div className="mb-2 grid grid-cols-3 gap-2 text-center text-sm font-medium">
            {alignments.ethic.map((ethic) => (
              <div key={ethic.value}>{ethic.label}</div>
            ))}
          </div>
          <div className="grid gap-2">
            {alignments.moral.map((moral) => (
              <div
                key={moral.value}
                className="grid grid-cols-[auto_1fr] gap-2"
              >
                <div className="flex w-16 items-center text-sm font-medium">
                  {moral.label}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {alignments.ethic.map((ethic) => {
                    const key = `${ethic.value},${moral.value}`;
                    const isSelected = key === selectedKey;
                    return (
                      <button
                        key={key}
                        className={cn(
                          "group relative aspect-square rounded-lg border bg-card text-card-foreground transition-all hover:bg-accent",
                          isSelected && "border-primary bg-primary/10",
                        )}
                        onClick={() =>
                          updateCharacter({
                            alignment: {
                              ethic: ethic.value,
                              moral: moral.value,
                            },
                          })
                        }
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                          {alignmentDescriptions[key]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
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
