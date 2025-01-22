"use client";

import { useState } from "react";
import type { Character, Step } from "@/types/character";
import { Button } from "@/components/ui/button";
import { TraitStep } from "./Traits";
import { ClassStep } from "./Class";
import { BackgroundStep } from "./Background";
import { AttributesStep } from "./Attributes";
import { AlignmentStep } from "./Alignment";
import { BackstoryStep } from "./Backstory";
import { CharacterDisplay } from "./sheet/display";

const INITIAL_CHARACTER: Character = {
  name: "",
  race: "",
  class: "",
  level: 1,
  background: "",
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  skills: [],
  proficiencies: {
    languages: [],
    tools: [],
  },
  spells: [],
  abilities: [],
  alignment: {
    ethic: 0,
    moral: 0,
  },
  backstory: "",
};

const steps: Step[] = [
  { title: "Traits", component: TraitStep },
  { title: "Class", component: ClassStep },
  { title: "Background", component: BackgroundStep },
  { title: "Attributes", component: AttributesStep },
  { title: "Alignment", component: AlignmentStep },
  { title: "Backstory", component: BackstoryStep },
] as const;

export default function CharacterWizard() {
  const [step, setStep] = useState(0);
  const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);
  const [isComplete, setIsComplete] = useState(false);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setCharacter(INITIAL_CHARACTER);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <CharacterDisplay character={character} />
        <div className="container mx-auto px-6">
          <Button onClick={handleReset} className="w-full">
            Create Another Character
          </Button>
        </div>
      </div>
    );
  }

  const CurrentStep = steps[step]?.component;
  if (!CurrentStep) {
    return (
      <>
        <div>Step stolen by Orcs</div>
        <div>This is an error</div>
      </>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Create Your Character</h1>
        <p className="text-muted-foreground">
          Step {step + 1} of {steps.length}: {steps[step].title}
        </p>
      </div>
      <CurrentStep
        character={character}
        updateCharacter={updateCharacter}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
}
